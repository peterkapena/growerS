import { RegisterAddressSchemaInput } from "../schema/register/register.address.schema.js";
import { RegisterContactSchemaInput } from "../schema/register/register.contact.schema.js";
import { RegisterOrganisationSchemaInput } from "../schema/register/register.organisation.schema.js";
import { RegisterPersonSchemaInput } from "../schema/register/register.person.schema.js";
import RegisterSchema, {
  RegisterSchemaInput,
} from "../schema/register/register.schema.js";
import { CreateUserInput, UserModel } from "../schema/user/user.schema.js";
import UserService from "./user.service.js";

export default class RegisterService {
  async addDefaultUser() {
    const contact: RegisterContactSchemaInput =
      new RegisterContactSchemaInput();
    contact.email = "peter@gmail.com";
    contact.cellNumber2 = "08121747676";
    contact.cellNumber = "08121747676";

    const address: RegisterAddressSchemaInput =
      new RegisterAddressSchemaInput();
    address.line1 = "line1";
    address.line2 = "line1";
    address.line3 = "line1";
    address.line4 = "line1";
    address.line5 = "line1";
    address.line6 = "line1";

    const person: RegisterPersonSchemaInput = new RegisterPersonSchemaInput();
    person.contact = contact;
    person.address = address;
    person.surName = "Lumumba";
    person.givenName = "Kapena Peter";
    person.flgGender = "Males";
    person.dob = "19/09/1990";
    person.flgMaritalStatus = "Single";

    const organisation: RegisterOrganisationSchemaInput =
      new RegisterOrganisationSchemaInput();
    organisation.contact = contact;
    organisation.address = address;
    organisation.name = "Grower";
    organisation.organisationType = 1;

    const input: RegisterSchemaInput = new RegisterSchemaInput();
    input.username = "peterkapena";
    input.password = process.env.PETER_KAPENA_PASSWORD;
    input.person = person;
    input.organisation = organisation;

    await this.register(input, true);
  }

  async register(
    input: RegisterSchemaInput,
    approveUser = false
  ): Promise<RegisterSchema> {
    const organisationContact =
      await input.organisation.contact.processContact();
    const organisationAddress =
      await input.organisation.address.processAddress();

    const organisation = await input.organisation.processOrganisation(
      organisationContact._id,
      organisationAddress._id
    );

    const personContact = await input.person.contact.processContact();
    const personAddress = await input.person.address.processAddress();
    const person = await input.person.ensurePerson(
      personContact._id,
      organisation._id,
      personAddress._id
    );

    const createUserInput: CreateUserInput = {
      password: input.password,
      organisationId: organisation._id,
      username: input.username,
      entPersonId: person._id,
    };

    const user = await UserModel.find()
      .findByUsername_OrganisationId(
        createUserInput.username,
        createUserInput.organisationId
      )
      .lean();

    if (!user) {
      await (
        await new UserService().createUser(createUserInput)
      ).update({ adminApproved: approveUser });
    }

    const rtn: RegisterSchema = {
      person: {
        surName: person.surName,
        _id: person._id,
        dob: person.dob,
        flgGender: person.flgGender,
        flgMaritalStatus: person.flgMaritalStatus,
        givenName: person.givenName,
        address: {
          line1: personAddress.line1,
          line2: personAddress.line2,
          line3: personAddress.line3,
          line4: personAddress.line4,
          line5: personAddress.line5,
          line6: personAddress.line6,
          _id: personAddress._id,
        },
        contact: {
          cellNumber: personContact.cellNumber,
          cellNumber2: personContact.cellNumber2,
          email: personContact.email,
          _id: personContact._id,
        },
      },
      organisation: {
        name: organisation.name,
        _id: organisation._id,
        address: {
          line1: organisationAddress.line1,
          line2: organisationAddress.line2,
          line3: organisationAddress.line3,
          line4: organisationAddress.line4,
          line5: organisationAddress.line5,
          line6: organisationAddress.line6,
          _id: organisationAddress._id,
        },
        contact: {
          cellNumber: organisationContact.cellNumber,
          cellNumber2: organisationContact.cellNumber2,
          email: organisationContact.email,
          _id: organisationContact._id,
        },
      },
    };

    return rtn;
  }
}
