import { Field, ObjectType, InputType } from "type-graphql";
import ContactSchema, { ContactModel } from "../contact/contact.schema.js";

@ObjectType()
export default class RegisterContactSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  cellNumber: String;

  @Field(() => String)
  cellNumber2: String;

  @Field(() => String)
  email: String;
}

@InputType()
export class RegisterContactSchemaInput {
  @Field(() => String)
  cellNumber: String;

  @Field(() => String)
  cellNumber2: String;

  @Field(() => String)
  email: String;

  /**
   * If we do not find a contact record with the input cellNumber, we create a new one and return the newly created one. Otherwise
   * we return the one matched
   * @param input
   * @returns
   */
  async processContact(): Promise<ContactSchema> {
    const contact = await ContactModel.find().findBycellNumber(this.cellNumber);
    if (contact) return contact;
    else {
      const newContact: ContactSchema = {
        ...this,
      };
      return await ContactModel.create(newContact);
    }
  }
}
