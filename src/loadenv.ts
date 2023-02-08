import { config } from "dotenv";
// import dotenv from "dotenv";

// dotenv.config({ path: `./.env.${process.env.NODE_ENV || "development"}` });

function loadEnv() {
  const env = config({
    // (1)
    path: `./.env.${process.env.NODE_ENV || "development"}`,
  });
  if (env.error) {
    // (2)
    throw env.error;
  }
  return { ...env };
}

export default loadEnv();
