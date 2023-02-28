import { getModelForClass, prop, queryMethod } from "@typegoose/typegoose";
import { AsQueryMethod, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { Field, ObjectType } from "type-graphql";
import CommonSchema from "../common.schema";

interface StatusHistorySchemaQueryHelpers {}

@ObjectType()
export default class StatusHistorySchema extends CommonSchema {
  @Field(() => String)
  _id?: String;

  @Field(() => String)
  recordId: String;

  @Field(() => String)
  statusId: String;

  @Field(() => String)
  statusRecordType: String;

  @Field(() => Date)
  date: Date;
}

export const StatusHistoryModel = getModelForClass<
  typeof StatusHistorySchema,
  StatusHistorySchemaQueryHelpers
>(StatusHistorySchema, {
  options: { customName: "StatusHistory" },
});
