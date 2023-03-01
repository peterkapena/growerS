import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  AddOrUpdateOrder,
  GetOrder,
} from "../schema/order/addOrUpdateOrder.schema.js";
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

  @Query(() => [GetOrder])
  async getOrders(@Ctx() { user }: Context): Promise<GetOrder[]> {
    return await this.orderService.getOrders(user.organisationId);
  }

  @Mutation(() => Boolean)
  async toggleOrderArchived(
    @Arg("id") id: String,
    @Arg("archived") archived: Boolean,
    @Ctx() { user }: Context
  ): Promise<boolean> {
    return this.orderService.toggleArchived(id, user, archived);
  }
}
