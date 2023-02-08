import { Mutation, Query, Resolver, Arg } from "type-graphql";
import ContactSchema from "../../schema/contact/contact.schema.js";
import { UserSchema } from "../../schema/index.js";
import PersonSchema from "../../schema/person/person.schema.js";
import AdminGetUsersSchema from "../../schema/user/adminGetUsers.schema.js";
import { SigninInput, SigninOutput } from "../../schema/user/signin.schema.js";
import { CreateUserInput, UserModel } from "../../schema/user/user.schema.js";
import { VerifyTokenSchema } from "../../schema/user/verifyToken.schema.js";
import { decodeJwt } from "../../service/jwt.js";
import UserService from "../../service/user.service.js";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => UserSchema)
  async createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => VerifyTokenSchema) //
  async verifyToken(
    @Arg("input") inputToken: string
  ): Promise<VerifyTokenSchema> {
    try {
      const decoded = decodeJwt<UserSchema>(inputToken);
      const user = await UserModel.findOne({ _id: decoded._id }).lean();
      const {
        contact,
        person,
        token,
      }: { contact: ContactSchema; person: PersonSchema; token: string } =
        await this.userService.getUserProfile(user);

      if (this.userService.adminApproved(user))
        return {
          isValid: true,
          email: contact?.email,
          givenName: person?.givenName,
          surName: person?.surName,
          token,
          username: user.username,
          organisationId: user.organisationId,
        };
    } catch (err) {
      console.log(err);
    }

    return {
      isValid: false,
      token: inputToken,
      organisationId: "",
    };
  }

  @Mutation(() => SigninOutput) //
  async signin(@Arg("input") input: SigninInput) {
    // console.log(input)
    return this.userService.signin(input);
  }

  //TODO:Implement authorization
  // @Authorized([ROLES.ADMIN])
  @Query(() => [AdminGetUsersSchema])
  async adminGetUsers(): Promise<AdminGetUsersSchema[]> {
    return this.userService.adminGetUsers();
  }

  //TODO:Implement authorization
  // @Authorized([ROLES.ADMIN])
  @Mutation(() => Boolean) //
  async toggleAdminApproved(
    @Arg("approved") approved: Boolean,
    @Arg("id") id: String
  ): Promise<Boolean> {
    return this.userService.toggleAdminApproved(approved, id);
  }

  // @Query(() => UserSchema)
  // async testQuery() {
  //   // return await UserModel.find().findByUsername("peterkapena").lean();
  //   return { username: "username", password: "password" };
  // }
}
