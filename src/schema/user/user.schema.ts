import {
  getModelForClass,
  prop,
  pre,
  queryMethod,
  index,
} from "@typegoose/typegoose";
import { Field, ObjectType, InputType } from "type-graphql";
import bcrypt from "bcrypt";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { encodeJwt } from "../../service/jwt.js";
import PersonSchema, { PersonModel } from "../person/person.schema.js";
import ContactSchema, { ContactModel } from "../contact/contact.schema.js";

function findByUsername_OrganisationId(
  this: ReturnModelType<typeof UserSchema, UserSchemaQueryHelpers>,
  username: UserSchema["username"],
  organisationId: UserSchema["organisationId"]
) {
  return this.findOne({ username, organisationId });
}

function findByUsername(
  this: ReturnModelType<typeof UserSchema, UserSchemaQueryHelpers>,
  username: UserSchema["username"]
) {
  return this.findOne({ username });
}

interface UserSchemaQueryHelpers {
  findByUsername_OrganisationId: AsQueryMethod<
    typeof findByUsername_OrganisationId
  >;
  findByUsername: AsQueryMethod<typeof findByUsername>;
}

@pre<UserSchema>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password.toString(), salt);
})
@index({ email: 1 })
@queryMethod(findByUsername_OrganisationId)
@queryMethod(findByUsername)
@ObjectType()
export default class UserSchema {
  @Field(() => String)
  _id: String;

  @Field(() => String, { nullable: true })
  @prop({ type: String, required: false })
  entPersonId: String;

  @Field(() => String)
  @prop({ type: String, required: true })
  organisationId: String;

  @Field(() => String)
  @prop({ type: String })
  username: String;

  @prop({ type: String, required: true })
  @Field(() => String)
  password: String;

  @prop({ type: [String], default: [], required: false })
  @Field(() => [String])
  roles: String[];

  @prop({ type: Boolean, default: false })
  @Field(() => Boolean)
  adminApproved: Boolean;

}

export const UserModel = getModelForClass<
  typeof UserSchema,
  UserSchemaQueryHelpers
>(UserSchema, {
  options: { customName: "User" },
});

export enum UserOrganisationIDs {
  ADMIN = -1,
}

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: String;

  @Field(() => String)
  @prop({ type: String, required: true })
  organisationId: String;

  @Field(() => String)
  password: String;

  @Field(() => String, { nullable: true })
  @prop({ type: String, required: false })
  entPersonId: String;

  @prop({ type: [String], default: [], required: false })
  @Field(() => [String])
  roles?: String[];
}

//TODO: Implement access level check in the authCheck method
export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
};
