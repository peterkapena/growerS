import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export default class GetPersonsSchema {
  @Field(() => String)
  _id: String;

  @Field(() => String)
  surName: String;

  @Field(() => String)
  givenName: String;

  @Field(() => String)
  gender: String;

  @Field(() => String)
  maritalStatus: String;

  @Field(() => String)
  organisation: String;
}

@ObjectType()
export class GetPersonSchema {
  @Field(() => String)
  _id: String;

  @Field(() => String)
  surName: String;

  @Field(() => String)
  givenName: String;

  @Field(() => String)
  gender: String;

  @Field(() => String)
  flgGender: String;

  @Field(() => String)
  maritalStatus: String;

  @Field(() => String)
  flgMaritalStatus: String;

  @Field(() => String)
  organisationId: String;

  @Field(() => String)
  organisation: String;

  @Field(() => String)
  contactId: String;

  @Field(() => String)
  email: String;

  @Field(() => String)
  cellNumber1: String;

  @Field(() => String)
  cellNumber2: String;

  @Field(() => String)
  addressId: String;

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
export class EditPersonBasicDetailsSchema {
  @Field(() => String)
  _id: String;

  @Field(() => String)
  surName: String;

  @Field(() => String)
  givenName: String;

  @Field(() => String)
  flgGender: String;
  @Field(() => String)
  flgMaritalStatus: String;
}

@InputType()
export class EditContactDetailsSchema {
  @Field(() => String)
  _id: String;

  @Field(() => String)
  email: String;

  @Field(() => String)
  cellNumber1: String;

  @Field(() => String)
  cellNumber2: String;
}

@InputType()
export class EditAddressDetailsSchema {
  @Field(() => String)
  _id: String;

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
