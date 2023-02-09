import ProductSchema, {
  ProductModel,
} from "../schema/product/product.schema.js";
import { GetProductsSchema } from "../schema/product/getProductNames.schema.js";
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
        organisation: organisation?.name || "",
        quantity: product.quantity,
        type: flgProductType.description,
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