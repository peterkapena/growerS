import { UserSchema } from "../schema";
import {
  FlagModel,
  FlagType,
  FlagType_OrderStatus_Submitted,
} from "../schema/flag/flag.schema.js";
import {
  AddOrUpdateOrder,
  GetOrder,
} from "../schema/order/addOrUpdateOrder.schema.js";
import OrderSchema, { OrderModel } from "../schema/order/order.schema.js";
import PersonSchema, { PersonModel } from "../schema/person/person.schema.js";
import ProductSchema, {
  ProductModel,
} from "../schema/product/product.schema.js";
import { UserModel } from "../schema/user/user.schema.js";

class OrderService {
  async toggleArchived(id: String, archived: Boolean): Promise<boolean> {
    await OrderModel.updateOne(
      { _id: id },
      {
        archived: archived,
      }
    );

    return true;
  }
  async getOrders(organisationId: String): Promise<GetOrder[]> {
    const getOrders: GetOrder[] = [];

    const orders: OrderSchema[] = await OrderModel.find({
      organisationId,
      archived: false,
    });

    for (const order of orders) {
      const user: UserSchema = await UserModel.findById(order.userId);
      const person: PersonSchema = await PersonModel.findById(user.entPersonId);
      const product: ProductSchema = await ProductModel.findById(
        order.productId
      );
      const productName: String = (
        await FlagModel.findById(product.flgProductType)
      ).description;
      const flgStatus: String = (await FlagModel.findById(order.flgStatusId))
        .description;

      // console.log(order);
      const getOrder: GetOrder = {
        ...order,
        dateSubmitted: order.dateSubmitted,
        submittedBy: person.givenName + ", " + person.surName,
        productName: productName,
        flgStatus,
        _id: order._id,
        quantity: order.quantity,
        unitPrice: product.unitPrice,
      };
      getOrders.push(getOrder);
    }

    return getOrders;
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

      order = await OrderModel.create(order);
    }

    // this.statusService.addOrUpdateStatus();
    return true;
  }
}

export default OrderService;
