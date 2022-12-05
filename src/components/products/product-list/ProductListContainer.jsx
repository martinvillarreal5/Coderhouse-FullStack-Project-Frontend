import ProductList from "./ProductList.jsx";
import useData from "../../../hooks/useData.js";
import useUser from "../../../hooks/useUser.js";

//list container: tiene logica de fetch, consigue la info, y  se la manda al list
//el list: recibe la info (el array), mapea la info y la muestra, y le manda cada indice a cada carta indiviual
// card: muestra un cart con la info que recibe, link to "/detail/${id}"

// /detail/:id

export default function ProductListContainer() {
  const { data: products, isLoading, isError } = useData("/products");
  const { isLogged } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.log(isError);
    return <p>Error fetching products data</p>;
  }

  return (
    <>
      <ProductList products={products} isLogged={isLogged}></ProductList>
    </>
  );
}
