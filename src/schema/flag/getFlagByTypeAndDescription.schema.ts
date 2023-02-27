import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export default class GetFlagByTypeAndDescription {
  @Field(() => String)
  description: String;

  @Field(() => Number)
  type: Number;
}

@ObjectType()
export class GetFlagType {
  @Field(() => String)
  id: String;

  @Field(() => String)
  typeName: String;
}
