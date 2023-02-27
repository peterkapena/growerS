import { Query, Resolver, Arg, Mutation } from "type-graphql";
import FlagSchema from "../../schema/flag/flag.schema.js";
import {
  AddOrUpdateFlag,
  GetFlagSchema,
} from "../../schema/flag/getFlag.schema.js";
import GetFlagByTypeAndDescription, {
  GetFlagType,
} from "../../schema/flag/getFlagByTypeAndDescription.schema.js";
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

  @Query(() => FlagSchema)
  async getFlagByTypeAndDescription(
    @Arg("input") input: GetFlagByTypeAndDescription
  ): Promise<FlagSchema> {
    return await this.flagService.getFlagByTypeAndDescription(input);
  }

  @Query(() => [GetFlagType])
  async getFlagTypes(): Promise<GetFlagType[]> {
    return await this.flagService.getFlagTypes();
  }

  @Query(() => GetFlagSchema, { nullable: true })
  async getFlag(@Arg("input") flagId: String): Promise<GetFlagSchema> {
    if (!flagId) return null;
    return await this.flagService.getFlag(flagId);
  }

  @Mutation(() => Boolean)
  async addOrUpdateFlag(
    @Arg("input") input: AddOrUpdateFlag
  ): Promise<boolean> {
    return await this.flagService.addOrUpdateFlag(input);
  }
}
