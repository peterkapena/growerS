import { Field, InputType } from "type-graphql";

@InputType()
export class AddProductSchemaInput {
  @Field(() => String)
  flgProductType: String;

  @Field(() => Number)
  quantity: Number;

  @Field(() => Number)
  unitPrice: Number;
}
