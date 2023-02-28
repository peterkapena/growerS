import { Resolver } from "type-graphql";
import StatusService from "../service/status.service.js";

@Resolver()
export default class StatusResolver {
  constructor(private statusService: StatusService) {
    this.statusService = new StatusService();
  }
}
