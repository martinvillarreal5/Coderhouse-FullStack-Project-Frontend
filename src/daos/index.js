import dotenv from "dotenv";
dotenv.config();

let ProductDao;
let CartDao;
try {
  switch (process.env.DATABASE || "mongo") {
    case "mongo":
      const { default: ProductDaoMongo } = await import(
        "./products/productDaoMongo.js"
      );
      /* const { default: CartDaoMongo } = await import(
        "./carts/cartDaoMongo.js"
      ); */

      ProductDao = ProductDaoMongo;
      /* CartDao = CartDaoMongo; */

      break;
  }
} catch (error) {
  console.log('Error in Dao index: ' + error)
}

export { ProductDao/* , CartDao  */ };