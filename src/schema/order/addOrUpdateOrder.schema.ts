import { Field, InputType } from "type-graphql";

@InputType()
export class AddOrUpdateOrder {
  @Field(() => String, { nullable: true })
  _id: String;

  @Field(() => Number)
  quantity: Number;

  @Field(() => String)
  productId: String;

  @Field(() => String)
  organisationId: String;
}
