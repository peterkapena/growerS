import { Field, ObjectType, InputType } from "type-graphql";
import OrganisationSchema, {
  OrganisationModel,
} from "../organisation/organisation.schema.js";
import RegisterAddressSchema, {
  RegisterAddressSchemaInput,
} from "./register.address.schema.js";
import RegisterContactSchema, {
  RegisterContactSchemaInput,
} from "./register.contact.schema.js";

@ObjectType()
export default class RegisterOrganisationSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  name: String;

  @Field(() => RegisterContactSchema)
  contact: RegisterContactSchema;

  @Field(() => RegisterAddressSchema)
  address: RegisterAddressSchema;
}

@InputType()
export class RegisterOrganisationSchemaInput {
  @Field(() => String)
  name: String;

  @Field(() => RegisterContactSchemaInput)
  contact: RegisterContactSchemaInput;

  @Field(() => RegisterAddressSchemaInput)
  address: RegisterAddressSchemaInput;

  @Field(() => Number)
  organisationType: Number;

  async processOrganisation(
    inputContactId: String,
    inputAddressId: String
  ): Promise<OrganisationSchema> {
    const organisation =
      await OrganisationModel.find().findByDescription_ContactId(
        this.name,
        inputContactId
      );
    if (organisation) return organisation;
    else {
      const newOrganisation: OrganisationSchema = {
        ...this,
        contactId: inputContactId,
        //TODO add the personid after the person is added above
        personId: "",
        addressId: inputAddressId,
      };

      return OrganisationModel.create(newOrganisation);
    }
  }
}
