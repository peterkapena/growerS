import { Field, ObjectType, InputType } from "type-graphql";
import AddressSchema, { AddressModel } from "../address/address.schema.js";

@ObjectType()
export default class RegisterAddressSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  line1: String;

  @Field(() => String)
  line2: String;

  @Field(() => String)
  line3: String;

  @Field(() => String)
  line4: String;

  @Field(() => String)
  line5: String;

  @Field(() => String)
  line6: String;
}

@InputType()
export class RegisterAddressSchemaInput {
  @Field(() => String)
  line1: String;

  @Field(() => String)
  line2: String;

  @Field(() => String)
  line3: String;

  @Field(() => String)
  line4: String;

  @Field(() => String)
  line5: String;

  @Field(() => String)
  line6: String;

  async processAddress() {
    const address = await AddressModel.findOne({ ...this });
    if (address) return address;
    else {
      const newAddress: AddressSchema = {
        ...this,
      };
      return await AddressModel.create(newAddress);
    }
  }
}
