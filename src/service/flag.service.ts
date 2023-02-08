import FlagSchema, { FlagModel } from "../schema/flag/flag.schema.js";

class FlagService {
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
}
export default FlagService;
