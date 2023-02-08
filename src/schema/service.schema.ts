import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

interface ServiceSchemaQueryHelpers {}

@ObjectType()
export default class ServiceSchema {
  @Field(() => String)
  _id?: String;

  @prop({ required: true })
  @Field(() => String)
  name: String;

  @prop({ required: true })
  @Field(() => Number)
  organisationId: Number;
}

export const ServiceModel = getModelForClass<
  typeof ServiceSchema,
  ServiceSchemaQueryHelpers
>(ServiceSchema, {
  options: { customName: "User" },
});
