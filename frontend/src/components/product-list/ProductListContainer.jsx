import ProductList from "./ProductList.jsx";
//import { getAllProducts } from "../../lib/productLib.js";

import useProducts from "../../hooks/useProducts.js";

export default function ProductListContainer() {
  //const { data, error } = useSWR(baseServerUrl + "/products", fetcher);
  const { products, isLoading, isError} = useProducts()

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.log(isError);
    return <p>Error fetching products data</p>;
  }

  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}
