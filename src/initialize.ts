import FlagService from "./service/flag.service.js";
import { initialFlags } from "./schema/flag/flag.schema.js";
import RegisterService from "./service/register.service.js";
import { connectToMongoDB } from "./service/mongo.js";

async function intialize() {
  await connectToMongoDB();
  await intitializeFlags();
  await initializeUser();
  // await intializeStatuses();
}

export default intialize();

async function initializeUser() {
  await new RegisterService().addDefaultUser();
}

async function intitializeFlags() {
  for (const flag of initialFlags) {
    const flagService = new FlagService();
    await flagService.create(flag);
  }
}

// async function intializeStatuses() {
//   for (const status of intitialStatuses) {
//     const statusService = new StatusService();
//     await statusService.create(status);
//   }
// }
