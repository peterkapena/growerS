import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { AddProductSchemaInput } from "../schema/product/addProduct.schema.js";
import { GetProductsSchema } from "../schema/product/getProducts.schema.js";
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
  @Query(() => GetProductsSchema)
  async getProduct(@Arg("input") input: String): Promise<GetProductsSchema> {
    return this.productService.getProduct(input);
  }

  @Query(() => [GetProductsSchema])
  async getProductsByOrganisation(
    @Arg("input") input: String
  ): Promise<GetProductsSchema[]> {
    return this.productService.getProductsByOrganisation(input);
  }

  @Mutation(() => ProductSchema)
  async addProduct(
    @Arg("input") input: AddProductSchemaInput,
    @Ctx() { user }: Context
  ): Promise<ProductSchema> {
    return this.productService.addProduct(input, user);
  }

  @Mutation(() => Boolean)
  async editProduct(
    @Arg("id") id: String,
    @Arg("input") input: AddProductSchemaInput,
    @Ctx() { user }: Context
  ): Promise<boolean> {
    return this.productService.editProduct(input, id, user);
  }

  @Mutation(() => Boolean)
  async toggleArchived(
    @Arg("id") id: String,
    @Arg("archived") archived: Boolean,
    @Ctx() { user }: Context
  ): Promise<boolean> {
    return this.productService.toggleArchived(id, user, archived);
  }
}
