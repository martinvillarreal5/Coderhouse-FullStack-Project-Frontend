import { Text, Image, Group, Box, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { baseServerUrl } from "../../../config/paths";
import { deleteProduct } from "../../../lib/productLib";
import { addProductToCart } from "../../../lib/cartLib";
import { useState } from "react";

export default function ProductDetail({ product, isAdmin }) {
  const [waitingResponse, setWaitingResponse] = useState(false);

  const handleAddToCart = async () => {
    try {
      setWaitingResponse(true);
      const responseMessage = await addProductToCart(id, 1);
      console.log(responseMessage);
      setWaitingResponse(false);
    } catch (error) {
      console.log(error);
      setWaitingResponse(false);
      // popup error alert
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <Group>
        <Image
          fit="contain"
          height={200}
          src={baseServerUrl + "/" + product.pictureUrl}
        />
      </Group>
      <Text size="xl">{capitalizeFirstLetter(product.title)}</Text>
      <Text size="md">${product.price}</Text>
      <Text size="sm">{product.description}</Text>
      {isAdmin ? (
        <>
          <Group mt="sm">
            <Button
              // variant="filled"
              color="green"
              disabled={product.stock < 1 ? true : false}
              // isLogged ? false :
              loading={waitingResponse ? true : false}
              onClick={() => handleAddToCart()}
            >
              Add to cart
            </Button>
            <Button
              component={Link}
              to={`/products/admin/update/${product.id}`}
            >
              Edit Product
            </Button>
            <Button
              component={Link}
              onClick={() => deleteProduct(product.id)}
              color="red"
              // TODO add confirmation alert/tooltip, add mutate, navigate to products
            >
              Delete Product
            </Button>
          </Group>
        </>
      ) : null}
    </>
  );
}
