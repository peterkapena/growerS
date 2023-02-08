import { prop } from "@typegoose/typegoose";
import { Field, InputType } from "type-graphql";

@InputType()
export class AddProductSchemaInput {
  @prop({ required: true })
  @Field(() => String)
  flgProductType: String;

  @prop({ required: true })
  @Field(() => Number)
  quantity: Number;
}
