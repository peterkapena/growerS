import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GetProductsSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  type: String;

  @Field(() => Number)
  quantity: Number;

  @Field(() => String)
  organisation: String;
}
