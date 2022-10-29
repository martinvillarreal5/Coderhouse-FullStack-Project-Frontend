import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  createStyles,
} from "@mantine/core";
import { addProductToCart } from "../../../lib/cartLib";
import { useState } from "react";
import { Link } from "react-router-dom";
import { baseServerUrl } from "../../../config/paths";

const useStyles = createStyles((theme) => ({
  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: "none",
  },
}));

export default function ProductCard({ productData, isLogged }) {
  const { classes } = useStyles();

  const { title, category, description, stock, price, id, pictureUrl } =
    productData;
  //console.log(id);
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

  return (
    <Card shadow="sm" p="lg" radius="md" mb="sm" withBorder>
      <Card.Section>
        <Image
          src={baseServerUrl + "/" + pictureUrl}
          fit="contain"
          mt="sm"
          height={200}
          alt="Norway"
        />
      </Card.Section>

      <Badge
        className={classes.rating}
        {...(stock > 0 ? { color: "green" } : { color: "red" })}
        variant="light"
      >
        {stock > 0 ? "Available" : "No stock"}
      </Badge>

      <Group position="apart" mt="md">
        <Text size="xl" weight={500}>
          {title}
        </Text>
      </Group>
      <Text size="md" color="dimmed">
        {category}
      </Text>
      <Text size="lg" weight={500}>
        ${price}
      </Text>
      <Text size="md">{description}</Text>
      <Group position="apart" mt="md" radius="md">
        <Button
          // variant="filled"
          color="green"
          disabled={stock < 1 ? true : isLogged ? false : true}
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
          //disabled={isLogged ? false : true}
          loading={waitingResponse ? true : false}
          //onClick={() => handleAddToCart()}
        >
          Detail
        </Button>
      </Group>
    </Card>
  );
}
