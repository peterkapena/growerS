import { Field, InputType } from "type-graphql";

@InputType()
export default class GetFlagByTypeAndDescription {
  @Field(() => String)
  description: String;

  @Field(() => Number)
  type: Number;
}
