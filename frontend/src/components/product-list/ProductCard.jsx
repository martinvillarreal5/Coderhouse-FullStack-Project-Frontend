import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { addProductToCart } from "../../lib/cartLib";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ productData, isLogged }) {
  const { title, price, id } = productData;
  //console.log(id);
  const [waitingResponse, setWaitingResponse] = useState(false);

  const handleAddToCart = async () => {
    try {
      setWaitingResponse(true);
      const productData = { productId: id, quantity: 1 };
      const responseMessage = await addProductToCart(productData);
      console.log(responseMessage);
      setWaitingResponse(false);
    } catch (error) {
      console.log(error);
      setWaitingResponse(false);
      // popup error alert
    }
  };

  return (
    <Card shadow="sm" p="lg" radius="md" mb="sm" withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Text size="md" color="dimmed">
        ${price}
      </Text>
      <Group position="apart" mt="md" radius="md">
        <Button
          // variant="filled"
          color="green"
          disabled={isLogged ? false : true}
          loading={waitingResponse ? true : false}
          onClick={() => handleAddToCart()}
        >
          Add to cart
        </Button>
        <Button
          // variant="light"
          component={Link}
          to={`/products/${id}`}
          color="blue"
          disabled={isLogged ? false : true}
          loading={waitingResponse ? true : false}
          //onClick={() => handleAddToCart()}
        >
          Detail
        </Button>
      </Group>
    </Card>
  );
}
