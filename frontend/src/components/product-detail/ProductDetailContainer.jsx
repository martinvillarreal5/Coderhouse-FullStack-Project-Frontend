import useData from "../../hooks/useData";
import { useParams } from "react-router-dom";
import { Text } from "@mantine/core";
import ProductDetail from "./ProductDetail";
import { useEffect } from "react";

export default function ProductDetailContainer() {
  const { productId } = useParams();
  const {
    data: product,
    isError,
    isLoading,
  } = useData(`/products/${productId}`);

  /* useEffect(() => {
    //for re-rendering the page on param change. Or is re-mount?. Research differences
    //maybe use methods in this link instead:
    //https://stackoverflow.com/questions/32261441/component-does-not-remount-when-route-parameters-change
    //after test it seems to be not necessary, it reloads when the paratemer change for some reason
    //probably not good since also reload the navbar and prob the whole app too...
}, [productId]); */

  if (isLoading) {
    return <Text>Is Loading</Text>;
  }
  if (isError) {
    //change to 404
    return <Text>Error fetching data</Text>;
  }
  return <ProductDetail product={product}></ProductDetail>;
}
