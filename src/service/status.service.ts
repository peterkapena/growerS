import StatusSchema, { StatusModel } from "../schema/status/status.schema.js";

class StatusService {
  async create(status: StatusSchema): Promise<StatusSchema> {
    const s = await StatusModel.find().findByName(status.name);
    if (s?._id) {
      return s;
    }
    return await StatusModel.create(status);
  }

  async addOrUpdateStatus({},): Promise<boolean> {
    // let status :StatusSchema= {

    // }
    return true;
  }
}

export default StatusService;
