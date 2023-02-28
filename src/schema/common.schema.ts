import { prop } from "@typegoose/typegoose";
import { Field } from "type-graphql";

export default class CommonSchema {
  @prop({ default: false, required: false })
  @Field(() => Boolean, { nullable: true })
  archived?: Boolean;
}
