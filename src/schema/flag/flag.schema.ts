import {
  getModelForClass,
  index,
  prop,
  queryMethod,
} from "@typegoose/typegoose";
import {
  AsQueryMethod,
  ReturnModelType,
} from "@typegoose/typegoose/lib/types.js";
import { Field, ObjectType } from "type-graphql";

function findByDescriptionAndType(
  this: ReturnModelType<typeof FlagSchema, FlagSchemaQueryHelpers>,
  flagTypeId: FlagSchema["flagTypeId"],
  description: FlagSchema["description"]
) {
  return this.findOne({ flagTypeId, description });
}

interface FlagSchemaQueryHelpers {
  findByDescriptionAndType: AsQueryMethod<typeof findByDescriptionAndType>;
}

@index({ description: 1, flagTypeId: 1 }, { unique: true })
@queryMethod(findByDescriptionAndType)
@ObjectType()
export default class FlagSchema {
  @Field(() => String)
  _id?: String;

  @prop({ required: true })
  @Field(() => String)
  description: String;

  @prop({ required: true })
  @Field(() => Number)
  flagTypeId: Number;

  @prop({ required: false, default: false })
  @Field(() => Boolean)
  archived?: Boolean;
}

export const FlagModel = getModelForClass<
  typeof FlagSchema,
  FlagSchemaQueryHelpers
>(FlagSchema, {
  options: { customName: "Flag" },
});

export enum FlagType {
  Gender = 1,
  MaritalStatus,
  ProductType,
  OrderStatus,
}

export const FlagType_Gender_Male = "Male";
export const FlagType_Gender_Married = "Married";

const genders = [
  {
    description: FlagType_Gender_Male,
    flagTypeId: FlagType.Gender,
  },
  {
    description: "Female",
    flagTypeId: FlagType.Gender,
  },
  {
    description: "Other",
    flagTypeId: FlagType.Gender,
  },
];

const maritalStatus = [
  {
    description: FlagType_Gender_Married,
    flagTypeId: FlagType.MaritalStatus,
  },
  {
    description: "Single",
    flagTypeId: FlagType.MaritalStatus,
  },
];
const productType = [
  {
    description: "Maize",
    flagTypeId: FlagType.ProductType,
  },
  {
    description: "Beans",
    flagTypeId: FlagType.ProductType,
  },
];

export const FlagType_OrderStatus_Submitted = "Submitted";
export const FlagType_OrderStatus_Completed = "Completed";
export const FlagType_OrderStatus_Cancelled = "Cancelled";
const orderStatus = [
  {
    description: FlagType_OrderStatus_Submitted,
    flagTypeId: FlagType.OrderStatus,
  },
  {
    description: FlagType_OrderStatus_Completed,
    flagTypeId: FlagType.OrderStatus,
  },
  {
    description: FlagType_OrderStatus_Cancelled,
    flagTypeId: FlagType.OrderStatus,
  },
];
export const initialFlags: FlagSchema[] = [
  ...genders,
  ...maritalStatus,
  ...productType,
  ...orderStatus,
];
