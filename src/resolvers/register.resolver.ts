import { Mutation, Query, Resolver, Arg } from "type-graphql";
import RegisterSchema, {
  RegisterSchemaInput,
} from "../schema/register/register.schema.js";
import UserSchema from "../schema/user/user.schema.js";
import RegisterService from "../service/register.service.js";

@Resolver()
export default class RegisterResolver {
  constructor(private registerService: RegisterService) {
    this.registerService = new RegisterService();
  }

  @Mutation(() => RegisterSchema)
  async register(@Arg("input") input: RegisterSchemaInput) {
    return this.registerService.register(input);
  }

  @Query(() => UserSchema)
  async testQuery() {
    // return await UserModel.find().findByUsername("peterkapena").lean();
    return { username: "Peter", password: "None" };
  }
}
