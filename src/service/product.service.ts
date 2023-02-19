import ProductSchema, {
  ProductModel,
} from "../schema/product/product.schema.js";
import { GetProductsSchema } from "../schema/product/getProducts.schema.js";
import { AddProductSchemaInput } from "../schema/product/addProduct.schema.js";
import { UserSchema } from "../schema/index.js";
import OrganisationSchema, {
  OrganisationModel,
} from "../schema/organisation/organisation.schema.js";
import { FlagModel } from "../schema/flag/flag.schema.js";

export const SIGNIN_RESULT_MESSAGE = {
  INVALID_USERNAME_PASSOWRD: "Invalid email or password",
};

class ProductService {
  async editProduct(
    input: AddProductSchemaInput,
    id: String,
    user: UserSchema
  ): Promise<boolean> {
    await ProductModel.updateOne(
      { _id: id, organisationId: user.organisationId },
      {
        quantity: input.quantity,
      }
    );

    return true;
  }

  async getProduct(id: String): Promise<GetProductsSchema> {
    console.log(id);
    return (await this.getProducts()).find(
      (p) => p._id.toString() === id.toString()
    );
  }

  async getProductsByOrganisation(input: String): Promise<GetProductsSchema[]> {
    return (await this.getProducts()).filter(
      (p) => p.organisationId.toString() === input.toString()
    );
  }

  async getProducts(): Promise<GetProductsSchema[]> {
    const products: GetProductsSchema[] = [];

    for (const product of await ProductModel.find()) {
      //Verify for the admin submitted products
      let organisation: OrganisationSchema;
      if (product.organisationId.length > 10)
        organisation = await OrganisationModel.findOne({
          _id: product.organisationId,
        }).select("name");

      const flgProductType = await FlagModel.findOne({
        _id: product.flgProductType,
      }).select("description");

      products.push({
        _id: product._id,
        organisationId: organisation?._id,
        organisationName: organisation?.name || "",
        quantity: product.quantity,
        type: flgProductType._id,
        name: flgProductType.description,
      });
    }

    return products;
  }

  async addProduct(
    input: AddProductSchemaInput,
    user: UserSchema
  ): Promise<ProductSchema> {
    const product: ProductSchema = {
      ...input,
      organisationId: user.organisationId,
    };

    return await ProductModel.create(product);
  }
}

export default ProductService;
