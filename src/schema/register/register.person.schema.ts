import { Field, ObjectType, InputType } from "type-graphql";
import { OrganisationModel } from "../organisation/organisation.schema.js";
import PersonSchema, { PersonModel } from "../person/person.schema.js";
import RegisterAddressSchema, {
  RegisterAddressSchemaInput,
} from "./register.address.schema.js";
import RegisterContactSchema, {
  RegisterContactSchemaInput,
} from "./register.contact.schema.js";

@InputType()
@ObjectType()
export default class RegisterPersonSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  surName: String;

  @Field(() => String)
  givenName: String;

  @Field(() => String)
  flgGender: String;

  @Field(() => String)
  dob: String;

  @Field(() => String)
  flgMaritalStatus: String;

  @Field(() => RegisterContactSchema)
  contact: RegisterContactSchema;

  @Field(() => RegisterAddressSchema)
  address: RegisterAddressSchema;
}

@InputType()
export class RegisterPersonSchemaInput {
  @Field(() => String)
  surName: String;

  @Field(() => String)
  givenName: String;

  @Field(() => String)
  flgGender: String;

  @Field(() => String)
  dob: String;

  @Field(() => String)
  flgMaritalStatus: String;

  @Field(() => RegisterContactSchemaInput)
  contact: RegisterContactSchemaInput;

  @Field(() => RegisterAddressSchemaInput)
  address: RegisterAddressSchemaInput;

  async ensurePerson(
    contactId: String,
    organisationId: String,
    inputAddressId: String
  ): Promise<PersonSchema> {
    const person: PersonSchema =
      await PersonModel.find().findBySurnameGivenNamecontactId(
        this.surName,
        this.givenName,
        contactId.toString()
      );

    if (person) {
      await this.updateOrganisationId(
        organisationId.valueOf(),
        person._id.valueOf()
      );
      return person;
    } else {
      let newPerson: PersonSchema = {
        ...this,
        contactId,
        organisationId,
        addressId: inputAddressId,
      };

      newPerson = await PersonModel.create(newPerson);

      await this.updateOrganisationId(
        organisationId.valueOf(),
        newPerson._id.valueOf()
      );
      return newPerson;
    }
  }

  updateOrganisationId = async (organisationId: string, personId: string) =>
    OrganisationModel.updateOne(
      { _id: organisationId },
      { personId: personId }
    );
}
