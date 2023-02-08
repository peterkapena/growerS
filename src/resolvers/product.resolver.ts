import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AddProductSchemaInput } from "../schema/product/addProduct.schema.js";
import { GetProductsSchema } from "../schema/product/getProductNames.schema.js";
import ProductSchema from "../schema/product/product.schema.js";
import ProductService from "../service/product.service.js";
import Context from "../types.js";

@Resolver()
export default class ProductResolver {
  constructor(private productService: ProductService) {
    this.productService = new ProductService();
  }

  @Query(() => [GetProductsSchema])
  async getProducts(): Promise<GetProductsSchema[]> {
    return this.productService.getProducts();
  }

  @Mutation(() => ProductSchema) //
  async addProduct(
    @Arg("input") input: AddProductSchemaInput,
    @Ctx() { user }: Context
  ): Promise<ProductSchema> {
    return this.productService.addProduct(input, user);
  }
}
