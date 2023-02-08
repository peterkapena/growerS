import { getModelForClass, prop, queryMethod } from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { Field, ObjectType } from "type-graphql";

interface PersonSchemaQueryHelpers {
  findBySurnameGivenNamecontactId: AsQueryMethod<
    typeof findBySurnameGivenNamecontactId
  >;
}

function findBySurnameGivenNamecontactId(
  this: ReturnModelType<typeof PersonSchema, PersonSchemaQueryHelpers>,
  surName: PersonSchema["surName"],
  givenName: PersonSchema["givenName"],
  contactId: PersonSchema["contactId"]
) {
  return this.findOne({ surName, givenName, contactId });
}

@queryMethod(findBySurnameGivenNamecontactId)
@ObjectType()
export default class PersonSchema {
  @Field(() => String)
  _id?: String;

  @prop({ required: true })
  @Field(() => String)
  surName: String;

  @prop({ required: true })
  @Field(() => String)
  givenName: String;

  @prop({ required: true })
  @Field(() => String)
  flgGender: String;

  @prop({ required: true })
  @Field(() => String)
  dob: String;

  @prop({ required: true })
  @Field(() => String)
  flgMaritalStatus: String;

  @prop()
  @Field(() => String)
  contactId: String;

  @prop()
  @Field(() => String)
  addressId: String;

  @prop()
  @Field(() => String)
  organisationId: String;
}

export const PersonModel = getModelForClass<
  typeof PersonSchema,
  PersonSchemaQueryHelpers
>(PersonSchema, {
  options: { customName: "Person" },
});
