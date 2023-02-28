import { UserSchema } from "../schema";
import {
  FlagModel,
  FlagType,
  FlagType_OrderStatus_Submitted,
} from "../schema/flag/flag.schema.js";
import { AddOrUpdateOrder } from "../schema/order/addOrUpdateOrder.schema.js";
import OrderSchema, { OrderModel } from "../schema/order/order.schema.js";
import StatusService from "./status.service.js";

class OrderService {
  constructor(private statusService?: StatusService) {
    this.statusService = new StatusService();
  }

  async addOrUpdateOrder(
    input: AddOrUpdateOrder,
    user: UserSchema
  ): Promise<boolean> {
    if (input._id) {
    } else {
      const flgStatusId = (
        await FlagModel.find().findByDescriptionAndType(
          FlagType.OrderStatus,
          FlagType_OrderStatus_Submitted
        )
      )._id;
      
      let order: OrderSchema = {
        dateSubmitted: new Date(Date.now()),
        organisationId: input.organisationId,
        productId: input.productId,
        quantity: input.quantity,
        userId: user._id,
        flgStatusId: flgStatusId,
      };
      console.log(order);

      order = await OrderModel.create(order);
    }

    // this.statusService.addOrUpdateStatus();
    return true;
  }
}

export default OrderService;
