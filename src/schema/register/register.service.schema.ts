import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export default class RegisterServiceSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  name: String;

  @Field(() => String)
  organisationId: String;
}

@InputType()
export class RegisterServiceSchemaInput {
  @Field(() => String)
  _id?: String;

  @Field(() => Number)
  description: Number;
}