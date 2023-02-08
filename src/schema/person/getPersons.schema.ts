import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class GetPersonsSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  surName: String;

  @Field(() => String)
  givenName: String;
}
