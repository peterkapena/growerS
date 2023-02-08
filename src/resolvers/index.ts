import RegisterResolver from "./register.resolver.js";
import FlagResolver from "./flag/flag.resolver.js";
import OrganisationResolver from "./organisation.resolver.js";
import PersonResolver from "./person.resolver.js";
import ProductResolver from "./product.resolver.js";
import UserResolver from "./user/user.resolver.js";
const resolvers = [
  UserResolver,
  RegisterResolver,
  ProductResolver,
  FlagResolver,
  OrganisationResolver,
  PersonResolver,
] as const;

export { resolvers };
