import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class GetFlagSchema {
  @Field(() => String)
  _id: String;

  @Field(() => String)
  description: String;

  @Field(() => Number)
  flagTypeId: Number;

  @Field(() => String)
  flagType: String;
}

@InputType()
export class AddOrUpdateFlag {
  @Field(() => String, { nullable: true })
  _id: String;

  @Field(() => String)
  description: String;

  @Field(() => Number)
  flagTypeId: Number;

  @Field(() => Boolean, { nullable: true })
  archived?: Boolean;
}
