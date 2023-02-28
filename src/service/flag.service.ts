import FlagSchema, { FlagModel, FlagType } from "../schema/flag/flag.schema.js";
import {
  AddOrUpdateFlag,
  GetFlagSchema,
} from "../schema/flag/getFlag.schema.js";
import GetFlagByTypeAndDescription, {
  GetFlagType,
} from "../schema/flag/getFlagByTypeAndDescription.schema.js";
import { getEnumName, getEnumValues } from "../utils.js";

class FlagService {
  async addOrUpdateFlag(input: AddOrUpdateFlag): Promise<boolean> {
    if (input._id) {
      console.log(input);
      await FlagModel.updateOne(
        { _id: input._id },
        { archived: input.archived, description: input.description }
      );
    } else {
      console.log(input);
      await this.create({
        description: input.description,
        flagTypeId: input.flagTypeId,
      });
    }
    return true;
  }

  async getFlag(id: String): Promise<GetFlagSchema> {
    const flag = await FlagModel.findById(id);
    const flagType = getEnumName(FlagType, flag.flagTypeId);
    return {
      _id: id,
      description: flag.description,
      flagType,
      flagTypeId: flag.flagTypeId,
    };
  }

  async getFlagTypes(): Promise<GetFlagType[]> {
    const flagTypes = getEnumValues<String, String>(FlagType);
    return flagTypes.map((f) => ({ id: f.value, typeName: f.description }));
  }

  async create(input: FlagSchema): Promise<FlagSchema> {
    const flag = await FlagModel.find().findByDescriptionAndType(
      input.flagTypeId,
      input.description
    );

    if (flag?._id) {
      if (flag.archived) {
        await FlagModel.updateOne(
          { archived: true, _id: flag?.id },
          { archived: false }
        );
      }
      return flag;
    }

    const newFlag = await FlagModel.create(input);

    return newFlag;
  }

  async getFlagsByType(type: number): Promise<FlagSchema[]> {
    const flags = (
      await FlagModel.find({ flagTypeId: type, archived: false })
    ).map<FlagSchema>((flag) => ({
      description: flag.description,
      flagTypeId: flag.flagTypeId,
      _id: flag._id,
    }));
    return flags;
  }

  async getFlagByTypeAndDescription(
    input: GetFlagByTypeAndDescription
  ): Promise<FlagSchema> {
    const flag = await FlagModel.find().findByDescriptionAndType(
      input.type,
      input.description
    );

    return flag;
  }
}

export default FlagService;
