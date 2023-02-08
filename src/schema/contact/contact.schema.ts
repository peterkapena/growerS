import {
  getModelForClass,
  index,
  prop,
  queryMethod,
} from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { Field, ObjectType } from "type-graphql";

interface ContactSchemaQueryHelpers {
  findBycellNumber: AsQueryMethod<typeof findBycellNumber>;
}

function findBycellNumber(
  this: ReturnModelType<typeof ContactSchema, ContactSchemaQueryHelpers>,
  cellNumber: ContactSchema["cellNumber"]
) {
  return this.findOne({ cellNumber });
}

@index({ cellNumber: 1 })
@queryMethod(findBycellNumber)
@ObjectType()
export default class ContactSchema {
  @Field(() => String)
  _id?: String;

  @prop({ required: true })
  @Field(() => String)
  cellNumber: String;

  @prop({ required: true })
  @Field(() => String)
  cellNumber2: String;

  @prop({ required: true })
  @Field(() => String)
  email: String;
}

export const ContactModel = getModelForClass<
  typeof ContactSchema,
  ContactSchemaQueryHelpers
>(ContactSchema, {
  options: { customName: "Contact" },
});
