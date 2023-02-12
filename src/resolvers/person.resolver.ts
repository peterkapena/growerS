import { Arg, Query, Resolver } from "type-graphql";
import GetPersonsSchema, {
  GetPersonSchema,
} from "../schema/person/getPersons.schema.js";
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

  @Query(() => GetPersonSchema)
  async getPerson(@Arg("input") input: String): Promise<GetPersonSchema> {
    return this.personService.getPerson(input);
  }
}
