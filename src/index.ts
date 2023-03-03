import "./loadenv.js";
import "./initialize.js";
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers/index.js";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import { decodeJwt } from "./service/jwt.js";
import Context from "./types.js";
import UserSchema from "./schema/user/user.schema.js";
import { authChecker } from "./authchecker.js";
import { unwrapResolverError } from "@apollo/server/errors";

const schema = await buildSchema({
  resolvers,
  validate: false,
  authChecker,
});

const server = new ApolloServer({
  schema,
  formatError: (formattedError, error) => {
    // unwrapResolverError removes the outer GraphQLError wrapping from
    // errors thrown in resolvers, enabling us to check the instance of
    // the original error
    console.log(error);
    if (unwrapResolverError(error)) {
      return { message: "Internal server error" };
    }
    return formattedError;
  },
  plugins: [
    process.env.NODE_ENV === "production" && !process.env.IS_TEST
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault(),
  ],
});

const main = async () => {
  const port = +process.env.APP_PORT;

  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
    context: async (ctx: Context) => {
      const token = ctx.req.headers.authorization || "";
      // console.log(token);
      if (token) {
        // console.log(token)
        const user = decodeJwt<UserSchema>(token);
        ctx.user = user;
        // console.log(user);
      }
      return ctx;
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main().catch((err) => console.log(err));

export { server };
