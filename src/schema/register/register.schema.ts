import { Field, ObjectType, InputType } from "type-graphql";
import RegisterOrganisationSchema, {
  RegisterOrganisationSchemaInput as RegisterOrganisationSchemaInput,
} from "./register.organisation.schema.js";
import RegisterPersonSchema, {
  RegisterPersonSchemaInput as RegisterPersonSchemaInput,
} from "./register.person.schema.js";

@ObjectType()
export default class RegisterSchema {
  @Field(() => RegisterPersonSchema)
  person: RegisterPersonSchema;

  @Field(() => RegisterOrganisationSchema)
  organisation: RegisterOrganisationSchema;
}

@InputType()
export class RegisterSchemaInput {
  @Field(() => RegisterPersonSchemaInput)
  person: RegisterPersonSchemaInput;

  @Field(() => RegisterOrganisationSchemaInput)
  organisation: RegisterOrganisationSchemaInput;

  @Field(() => String)
  username: String;

  @Field(() => String)
  password: String;
}
