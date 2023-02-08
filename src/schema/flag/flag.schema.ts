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
}

export const initialFlags: FlagSchema[] = [
  {
    description: "Male",
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
  {
    description: "Married",
    flagTypeId: FlagType.MaritalStatus,
  },
  {
    description: "Single",
    flagTypeId: FlagType.MaritalStatus,
  },
  {
    description: "Maize",
    flagTypeId: FlagType.ProductType,
  },
  {
    description: "Beans",
    flagTypeId: FlagType.ProductType,
  },
];
