import dotenv from "dotenv";
dotenv.config();

let ProductDao;
let CartDao;

const testDB = "mongo"
try {
  switch (process.env.DATABASE || testDB) {
    case "mongo":
      console.log("mongodb selected in daos index");
      const { default: ProductDaoMongo } = await import(
        "./products/productDaoMongo.js"
      );
      /* const { default: CartDaoMongo } = await import(
        "./carts/cartDaoMongo.js"
      ); */

      ProductDao = new ProductDaoMongo;
      /* CartDao = CartDaoMongo; */

      break;
  }
} catch (error) {
  console.log('Error in Dao index: ' + error)
}

export { ProductDao/* , CartDao  */ };