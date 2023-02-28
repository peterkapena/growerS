import RegisterResolver from "./register.resolver.js";
import FlagResolver from "./flag.resolver.js";
import OrganisationResolver from "./organisation.resolver.js";
import PersonResolver from "./person.resolver.js";
import ProductResolver from "./product.resolver.js";
import UserResolver from "./user.resolver.js";
import StatusResolver from "./status.resolver.js";
import OrderResolver from "./order.resolver.js";
const resolvers = [
  UserResolver,
  RegisterResolver,
  ProductResolver,
  FlagResolver,
  OrganisationResolver,
  PersonResolver,
  // StatusResolver,
  OrderResolver
] as const;

export { resolvers };
