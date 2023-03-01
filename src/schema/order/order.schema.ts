import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import CommonSchema from "../common.schema.js";

interface OrderSchemaQueryHelpers {}

@ObjectType()
export default class OrderSchema extends CommonSchema {
  @Field(() => String)
  _id?: String;

  @prop({ required: true })
  @Field(() => String)
  userId: String;

  @prop({ required: true })
  @Field(() => Number)
  quantity: Number;

  @prop({ required: true })
  @Field(() => String)
  productId: String;

  @prop({ required: true })
  @Field(() => Date)
  dateSubmitted: Date;

  @prop({ required: true })
  @Field(() => String)
  organisationId: String;

  @prop({ required: true })
  @Field(() => String)
  flgStatusId: String;
}

export const OrderModel = getModelForClass<
  typeof OrderSchema,
  OrderSchemaQueryHelpers
>(OrderSchema, {
  options: { customName: "Order" },
});
