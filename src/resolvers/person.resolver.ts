import { Query, Resolver } from "type-graphql";
import GetPersonsSchema from "../schema/person/getPersons.schema.js";
import PersonService from "../service/person.service.js";

@Resolver()
export default class PersonResolver {
  constructor(private personService: PersonService) {
    this.personService = new PersonService();
  }

  @Query(() => [GetPersonsSchema])
  async getPersons(): Promise<GetPersonsSchema[]> {
    return this.personService.getPersons();
  }
}
