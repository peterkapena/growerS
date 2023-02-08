import { Field, ObjectType, InputType } from "type-graphql";
import ProductSchema, { ProductModel } from "../product/product.schema.js";

@ObjectType()
export default class RegisterProductSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  name: String;

  @Field(() => Number)
  quantity: Number;

  @Field(() => String)
  organisationId: String;
}

@InputType()
export class RegisterProductSchemaInput {
  @Field(() => String)
  name: String;

  @Field(() => Number)
  quantity: Number;

  async processProduct(organisationId: String): Promise<ProductSchema> {
    const product: ProductSchema =
      await ProductModel.find().findByName_OrganisationId(
        this.name,
        organisationId
      );

    if (product)
      return await ProductModel.findOneAndUpdate(
        { _id: product._id },
        { quantity: this.quantity },
        { new: true }
      );
    else {
      return await ProductModel.create({
        ...this,
        organisationId,
      });
    }
  }
}
