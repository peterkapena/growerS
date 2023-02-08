import { getModelForClass, prop, queryMethod } from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { Field, ObjectType } from "type-graphql";

interface PurchaseSchemaQueryHelpers {
  findByName_OrganisationId: AsQueryMethod<typeof findByName_OrganisationId>;
}
function findByName_OrganisationId(
  this: ReturnModelType<typeof PurchaseSchema, PurchaseSchemaQueryHelpers>,
  productName: PurchaseSchema["productName"],
  organisationId: PurchaseSchema["organisationId"]
) {
  return this.findOne({ productName, organisationId });
}

@queryMethod(findByName_OrganisationId)
@ObjectType()
export default class PurchaseSchema {
  @Field(() => String)
  _id?: String;

  @prop({ required: true })
  @Field(() => String)
  productName: String;

  @prop({ required: true })
  @Field(() => Number)
  quantity: Number;

  @prop({ required: true })
  @Field(() => String)
  organisationId: String;
}

export const PurchaseModel = getModelForClass<
  typeof PurchaseSchema,
  PurchaseSchemaQueryHelpers
>(PurchaseSchema, {
  options: { customName: "User" },
});
