import dotenv from "dotenv";
dotenv.config();

let ProductDao;
let CartDao;

switch (process.env.DATABASE || "mongo") {
  case "mongo":
    const { default: ProductDaoMongo } = await import(
      "./products/productDaoMongo"
    );
    const { default: CartDaoMongo } = await import(
      "./carts/cartDaoMongo"
    );

    ProductDao = ProductDaoMongo;
    CartDao = CartDaoMongo;

    break;
}

export { ProductDao, CartDao };