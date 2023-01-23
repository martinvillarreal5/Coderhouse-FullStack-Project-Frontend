import {
  Text,
  Title,
  Divider,
  Stack,
  Button,
  SimpleGrid,
  Rating,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../../lib/productLib";
import { addProductToCart } from "../../../lib/cartLib";
import ProductDetailCarousel from "./ProductDetailCarousel";
import { useState } from "react";

export default function ProductDetail({ product, isAdmin, isLogged }) {
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
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 1 },
          { minWidth: "md", cols: 2 },
        ]}
      >
        <ProductDetailCarousel
          pictures={[product.pictureUrl, product.backPictureUrl]}
        />
        <div>
          <Stack spacing="none" align="flex-start">
            <Rating defaultValue={4} />
            <Title order={2} weight="500">
              {product.title}
            </Title>
            <Text size="md">{capitalizeFirstLetter(product.category)}</Text>
            <Title order={3} weight="500">
              ${product.price}
            </Title>
          </Stack>
          <Divider size={"sm"} my="sm" />
          <Stack spacing="xs" align="flex-start">
            <Text size="sm">Units available: {product.stock}</Text>
            add qty controls
            <Button
              color="green"
              disabled={product.stock < 1 ? true : false}
              loading={waitingResponse ? true : false}
              onClick={() => handleAddToCart()}
            >
              Add to cart
            </Button>
          </Stack>
          <Divider size={"sm"} my="sm" />
          <Text size="md">{product.description}</Text>
          {isAdmin ? (
            <>
              <Divider size={"sm"} my="sm" />
              <Stack spacing="xs" align="flex-start">
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
              </Stack>
            </>
          ) : null}
        </div>
      </SimpleGrid>
    </>
  );
}
