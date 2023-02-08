import { getModelForClass, prop, queryMethod } from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { Field, ObjectType } from "type-graphql";

interface OrganisationSchemaQueryHelpers {
  findByDescription_ContactId: AsQueryMethod<
    typeof findByDescription_ContactId
  >;
}

function findByDescription_ContactId(
  this: ReturnModelType<
    typeof OrganisationSchema,
    OrganisationSchemaQueryHelpers
  >,
  description: OrganisationSchema["name"],
  contactId: OrganisationSchema["contactId"]
) {
  return this.findOne({
    name: description,
    contactId,
    // organisationType: [organisationType],
  });
}

@queryMethod(findByDescription_ContactId)
@ObjectType()
export default class OrganisationSchema {
  @Field(() => String)
  _id?: String;

  @prop({ required: true })
  @Field(() => String)
  name: String;

  @prop()
  @Field(() => String)
  personId: String;

  @prop()
  @Field(() => Number)
  organisationType: Number;

  @prop()
  @Field(() => String)
  addressId: String;

  @prop()
  @Field(() => String)
  contactId: String;
}

export const OrganisationModel = getModelForClass<
  typeof OrganisationSchema,
  OrganisationSchemaQueryHelpers
>(OrganisationSchema, {
  options: { customName: "Organisation" },
});

export enum OrganisationTypes {
  FARM = 1,
  BUYER,
  AGENT,
}
