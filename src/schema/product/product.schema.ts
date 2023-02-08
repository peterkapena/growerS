import { getModelForClass, prop, queryMethod } from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { Field, ObjectType } from "type-graphql";

interface ProductSchemaQueryHelpers {
  findByName_OrganisationId: AsQueryMethod<typeof findByName_OrganisationId>;
}
function findByName_OrganisationId(
  this: ReturnModelType<typeof ProductSchema, ProductSchemaQueryHelpers>,
  name: ProductSchema["flgProductType"],
  organisationId: ProductSchema["organisationId"]
) {
  return this.findOne({ flgProductType: name, organisationId });
}

@queryMethod(findByName_OrganisationId)
@ObjectType()
export default class ProductSchema {
  @Field(() => String)
  _id?: String;

  @prop({ required: true })
  @Field(() => String)
  flgProductType: String;

  @prop({ required: true })
  @Field(() => Number)
  quantity: Number;

  @prop({ required: true })
  @Field(() => String)
  organisationId: String;
}

export const ProductModel = getModelForClass<
  typeof ProductSchema,
  ProductSchemaQueryHelpers
>(ProductSchema, {
  options: { customName: "Product" },
});

