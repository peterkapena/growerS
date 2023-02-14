import {
  Mutation,
  Query,
  Resolver,
  Arg,
  ObjectType,
 } from "type-graphql";
import RegisterSchema, {
  RegisterSchemaInput,
} from "../schema/register/register.schema.js";
import RegisterService from "../service/register.service.js";

ObjectType();

@Resolver()
export default class RegisterResolver {
  constructor(private registerService: RegisterService) {
    this.registerService = new RegisterService();
  }

  @Mutation(() => RegisterSchema)
  async register(@Arg("input") input: RegisterSchemaInput) {
    return this.registerService.register(input);
  }

  @Query(() => String)
  testQuery() {
    // return await UserModel.find().findByUsername("peterkapena").lean();
    return process.env.NODE_ENV || "empty";
  }
}
