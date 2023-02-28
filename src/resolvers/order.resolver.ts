import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { AddOrUpdateOrder } from "../schema/order/addOrUpdateOrder.schema.js";
import OrderService from "../service/order.service.js";
import Context from "../types.js";

@Resolver()
export default class OrderResolver {
  constructor(private orderService: OrderService) {
    this.orderService = new OrderService();
  }

  @Mutation(() => Boolean)
  async addOrUpdateOrder(
    @Arg("input") input: AddOrUpdateOrder,
    @Ctx() { user }: Context
  ): Promise<boolean> {
    return await this.orderService.addOrUpdateOrder(input, user);
  }
}
