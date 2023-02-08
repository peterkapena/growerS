import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class AdminGetUsersSchema {
  @Field(() => String)
  _id: String;

  @Field(() => String, { nullable: true })
  @prop({ type: String, required: false })
  entPersonName: String;

  @Field(() => String)
  @prop({ type: String, required: true })
  organisationName: String;

  @Field(() => String)
  @prop({ type: String })
  username: String;

  @prop({ type: Boolean, default: false })
  @Field(() => Boolean)
  adminApproved: Boolean;
}
