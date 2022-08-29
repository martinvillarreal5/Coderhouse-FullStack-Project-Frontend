import dotenv from "dotenv";
dotenv.config();

let ProductDao;
let CartDao;

try {
  switch (process.env.DATABASE) {
    case "mongo":
      console.log("mongodb selected in daos index");
      const { default: ProductDaoMongo } = await import(
        "./products/productDaoMongo.js"
      );
      const { default: CartDaoMongo } = await import(
        "./carts/cartDaoMongo.js"
      );

      ProductDao = new ProductDaoMongo;
      CartDao = new CartDaoMongo;

      break;
    default:
        throw "No database especified in the env file";
      ;
  }
} catch (error) {
  console.log('Error in Dao index: ' + error)
}

export { ProductDao, CartDao };