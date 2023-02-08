import UserSchema, {
  CreateUserInput,
  ROLES,
  UserModel,
} from "../schema/user/user.schema.js";
import bcrypt from "bcrypt";
import { encodeJwt } from "./jwt.js";
import AdminGetUsersSchema from "../schema/user/adminGetUsers.schema.js";
import PersonSchema, { PersonModel } from "../schema/person/person.schema.js";
import { OrganisationModel } from "../schema/organisation/organisation.schema.js";
import ContactSchema, {
  ContactModel,
} from "../schema/contact/contact.schema.js";
import { SigninInput, SigninOutput } from "../schema/user/signin.schema.js";

export const SIGNIN_RESULT_MESSAGE = {
  INVALID_USERNAME_PASSOWRD: "Invalid email or password",
  NOT_APPROVED_BY_ADMIN:
    "User not approved by Admin. You will be notified when approved so you can sign in",
};

class UserService {
  async getUserProfile(user: UserSchema) {
    const token = encodeJwt(user);

    //get person profile
    let person: PersonSchema;
    let contact: ContactSchema;

    if (user.entPersonId?.length > 10) {
      person = await PersonModel.findOne({ _id: user.entPersonId });
      contact = await ContactModel.findOne({ _id: person.contactId });
    }
    return { contact, person, token };
  }

  adminApproved(user: UserSchema): boolean {
    if (!user) return false;
    if (user.roles?.includes(ROLES.ADMIN)) return true;
    if (user.adminApproved) return true;

    return false;
  }

  async signin(input: SigninInput): Promise<SigninOutput> {
    let message = "";
    const user = await UserModel.find().findByUsername(input.username).lean();

    if (!user) message = SIGNIN_RESULT_MESSAGE.INVALID_USERNAME_PASSOWRD;
    else if (!this.adminApproved(user))
      message = SIGNIN_RESULT_MESSAGE.NOT_APPROVED_BY_ADMIN;

    //validate password
    const passwordIsValid = await bcrypt.compare(
      input.password.toString(),
      user.password.toString()
    );

    if (!passwordIsValid)
      message = SIGNIN_RESULT_MESSAGE.INVALID_USERNAME_PASSOWRD;

    if (!message)
      var {
        contact,
        person,
        token,
      }: { contact: ContactSchema; person: PersonSchema; token: string } =
        await this.getUserProfile(user);

    const out: SigninOutput =
      message.length > 0
        ? { message }
        : {
            username: user.username,
            email: contact?.email,
            givenName: person?.givenName,
            surName: person?.surName,
            token,
          };

    return out;
  }
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  async adminGetUsers(): Promise<AdminGetUsersSchema[]> {
    const rtn: AdminGetUsersSchema[] = [];

    const users = await UserModel.find();

    for (const u of users) {
      //The below condition is to leave out the super admin users that do not have person profiles
      if (u.entPersonId.length < 10) continue;
      const person = await PersonModel.findOne({ _id: u.entPersonId });
      const fullName = person.givenName + " " + person.surName;
      const organisation = await OrganisationModel.findOne({
        _id: u.organisationId,
      });

      rtn.push({
        _id: u._id,
        adminApproved: u.adminApproved,
        username: u.username,
        entPersonName: fullName,
        organisationName: organisation.name,
      });
    }

    return rtn;
  }

  async toggleAdminApproved(approved: Boolean, id: String): Promise<Boolean> {
    await UserModel.updateOne({ _id: id }, { adminApproved: approved });

    return approved;
  }
}

export default UserService;
