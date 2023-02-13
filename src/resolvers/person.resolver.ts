import { Arg, Mutation, Query, Resolver } from "type-graphql";
import GetPersonsSchema, {
  EditAddressDetailsSchema,
  EditContactDetailsSchema,
  EditPersonBasicDetailsSchema,
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

  @Mutation(() => Boolean)
  async editPersonBasicDetails(
    @Arg("input") input: EditPersonBasicDetailsSchema
  ): Promise<boolean> {
    return this.personService.editPersonBasicDetails(input);
  }

  @Mutation(() => Boolean)
  async editContactDetails(
    @Arg("input") input: EditContactDetailsSchema
  ): Promise<boolean> {
    console.log(input);
    return this.personService.editContactDetails(input);
  }

  @Mutation(() => Boolean)
  async editAddressDetails(
    @Arg("input") input: EditAddressDetailsSchema
  ): Promise<boolean> {
    return this.personService.editAddressDetails(input);
  }
}
