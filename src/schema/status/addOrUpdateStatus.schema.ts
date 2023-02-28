import { Field, InputType } from "type-graphql";

@InputType()
export class AddOrUpdateStatus {
  @Field(() => String, { nullable: true })
  _id: String;

  @Field(() => String)
  quantity: String;

  @Field(() => String)
  productId: String;

  @Field(() => String)
  organisationId: String;
}
