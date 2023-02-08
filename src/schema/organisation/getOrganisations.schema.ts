import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class GetOrganisationsSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  name: String;
}
