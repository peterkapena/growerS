import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class VerifyTokenSchema {
  @Field(() => Boolean)
  isValid!: Boolean;

  @Field(() => String, { nullable: true })
  username?: String;

  @Field(() => String)
  token: String;

  @Field(() => String, { nullable: true })
  email?: String;

  @Field(() => String, { nullable: true })
  surName?: String;

  @Field(() => String, { nullable: true })
  givenName?: String;

  @Field(() => String)
  organisationId: String;
}
