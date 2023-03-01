import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class AddOrUpdateOrder {
  @Field(() => String, { nullable: true })
  _id: String;

  @Field(() => Number)
  quantity: Number;

  @Field(() => String)
  productId: String;

  @Field(() => String)
  organisationId: String;
}

@ObjectType()
export class GetOrder {
  @Field(() => String, { nullable: true })
  _id: String;

  @Field(() => String)
  submittedBy: String;

   @Field(() => String)
  productName: String;

  @Field(() => Date)
  dateSubmitted: Date;

  @Field(() => String)
  flgStatus: String;

  @Field(() => Number)
  quantity: Number;
  
  @Field(() => Number)
  unitPrice: Number;
}
