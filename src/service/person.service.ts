import FlagSchema, { FlagModel, FlagType } from "../schema/flag/flag.schema.js";
import { OrganisationModel } from "../schema/organisation/organisation.schema.js";
import GetPersonsSchema from "../schema/person/getPersons.schema.js";
import PersonSchema, { PersonModel } from "../schema/person/person.schema.js";

export const SIGNIN_RESULT_MESSAGE = {
  INVALID_USERNAME_PASSOWRD: "Invalid email or password",
};

class PersonService {
  async getPersons(): Promise<GetPersonsSchema[]> {
    const persons: GetPersonsSchema[] = [];

    const people: PersonSchema[] = await PersonModel.find().select(
      "surName givenName _id flgGender dob flgMaritalStatus organisationId "
    );

    for (const person of people) {
      let maritalStatus = (
        await FlagModel.find({ _id: person.flgMaritalStatus })
      )[0].description;

      let gender = (await FlagModel.find({ _id: person.flgGender }))[0]
        .description;

      let organisation = (
        await OrganisationModel.find({ _id: person.organisationId })
      )[0].name;

      persons.push({
        maritalStatus,
        gender,
        organisation,
        surName: person.surName,
        givenName: person.givenName,
        _id: person._id,
      });
    }

    return persons;
  }
}

export default PersonService;
