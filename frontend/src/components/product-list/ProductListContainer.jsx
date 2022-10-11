import ProductList from "./ProductList.jsx";
//import { getAllProducts } from "../../lib/productLib.js";

import useData from "../../hooks/useData.js";
import useUser from "../../hooks/useUser.js";

export default function ProductListContainer() {
  const { data: products, isLoading, isError } = useData("/products");
  const { loggedOut } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.log(isError);
    return <p>Error fetching products data</p>;
  }

  return (
    <>
      <ProductList products={products} isLogged={!loggedOut}></ProductList>
    </>
  );
}
