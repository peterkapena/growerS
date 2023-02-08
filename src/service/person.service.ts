import GetPersonsSchema from "../schema/person/getPersons.schema.js";
import PersonSchema, { PersonModel } from "../schema/person/person.schema.js";

export const SIGNIN_RESULT_MESSAGE = {
  INVALID_USERNAME_PASSOWRD: "Invalid email or password",
};

class PersonService {
  async getPersons(): Promise<GetPersonsSchema[]> {
    const rtn: PersonSchema[] = await PersonModel.find().select(
      "surName givenName _id"
    );

    return rtn.map<GetPersonsSchema>((r) => ({
      surName: r.surName,
      givenName: r.givenName,
      _id: r._id,
    }));
  }
}

export default PersonService;
