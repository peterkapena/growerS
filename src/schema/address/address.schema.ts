import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

interface AddressSchemaQueryHelpers {}

@ObjectType()
export default class AddressSchema {
  @Field(() => String)
  _id?: String;

  @prop({ required: true })
  @Field(() => String)
  line1: String;

  @prop({ required: true })
  @Field(() => String)
  line2: String;

  @prop({ required: true })
  @Field(() => String)
  line3: String;

  @prop({ required: true })
  @Field(() => String)
  line4: String;

  @prop({ required: true })
  @Field(() => String)
  line5: String;

  @prop({ required: true })
  @Field(() => String)
  line6: String;
}

export const AddressModel = getModelForClass<
  typeof AddressSchema,
  AddressSchemaQueryHelpers
>(AddressSchema, {
  options: { customName: "Address" },
});
