import { Authorized, Query, Resolver } from "type-graphql";
import GetOrganisationsSchema from "../schema/organisation/getOrganisations.schema.js";
import OrganisationService from "../service/organisation.service.js";

@Resolver()
export default class OrganisationResolver {
  constructor(private organisationService: OrganisationService) {
    this.organisationService = new OrganisationService();
  }

  @Authorized()
  @Query(() => [GetOrganisationsSchema])
  async getOrganisations(): Promise<GetOrganisationsSchema[]> {
    return this.organisationService.getOrganisations();
  }
}
