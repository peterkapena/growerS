import { Query, Resolver, Arg } from "type-graphql";
import FlagSchema from "../../schema/flag/flag.schema.js";
import FlagService from "../../service/flag.service.js";

@Resolver()
export default class FlagResolver {
  constructor(private flagService: FlagService) {
    this.flagService = new FlagService();
  }

  @Query(() => [FlagSchema])
  async getFlagsByType(@Arg("input") type: Number): Promise<FlagSchema[]> {
    return await this.flagService.getFlagsByType(type.valueOf());
  }
}
