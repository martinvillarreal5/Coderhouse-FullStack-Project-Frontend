import useData from "../../../hooks/useData";
import useUser from "../../../hooks/useUser";
import { useParams } from "react-router-dom";
import { Text } from "@mantine/core";
import ProductDetail from "./ProductDetail";

export default function ProductDetailContainer() {
  const { productId } = useParams();
  const {
    data: product,
    isError,
    isLoading,
  } = useData(`/products/${productId}`);

  const { isAdmin, isLogged } = useUser();

  if (isLoading) {
    return <Text>Is Loading</Text>;
  }
  if (isError) {
    //change to 404
    return <Text>Error fetching data</Text>;
  }
  return (
    <ProductDetail
      product={product}
      isAdmin={isAdmin}
      isLogged={isLogged}
    ></ProductDetail>
  );
}
