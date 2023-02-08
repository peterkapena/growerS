import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class SigninInput {
  @Field(() => String)
  username: String;

  @Field(() => String)
  password: String;
}

@ObjectType()
export class SigninOutput {
  @Field(() => String, { nullable: true })
  username?: String;

  @Field(() => String, { nullable: true })
  token?: String;

  @Field(() => String, { nullable: true })
  email?: String;

  @Field(() => String, { nullable: true })
  surName?: String;

  @Field(() => String, { nullable: true })
  givenName?: String;

  @Field(() => String, { nullable: true })
  message?: String;
}
