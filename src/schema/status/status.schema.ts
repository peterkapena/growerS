import { getModelForClass, prop, queryMethod } from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { Field, ObjectType } from "type-graphql";
import CommonSchema from "../common.schema.js";

function findByName(
  this: ReturnModelType<typeof StatusSchema, StatusSchemaQueryHelpers>,
  name: StatusSchema["name"]
) {
  return this.findOne({ name });
}

interface StatusSchemaQueryHelpers {
  findByName: AsQueryMethod<typeof findByName>;
}
@queryMethod(findByName)
@ObjectType()
export default class StatusSchema extends CommonSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  @prop({ unique: true })
  name: String;

  @Field(() => String)
  description?: String;
}

export const StatusModel = getModelForClass<
  typeof StatusSchema,
  StatusSchemaQueryHelpers
>(StatusSchema, {
  options: { customName: "Status" },
});

const FlagType_OrderStatus_Submitted = "Submitted";
const FlagType_OrderStatus_Completed = "Completed";
const FlagType_OrderStatus_Cancelled = "Cancelled";

const orderStatuses: StatusSchema[] = [
  {
    name: FlagType_OrderStatus_Submitted,
  },
  {
    name: FlagType_OrderStatus_Completed,
  },
  {
    name: FlagType_OrderStatus_Cancelled,
  },
];

export const intitialStatuses: StatusSchema[] = [...orderStatuses];
