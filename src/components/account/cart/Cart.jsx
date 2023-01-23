import { Button, Table, Text, ActionIcon, Card, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { sendNewOrder } from "../../../lib/orderLib";
import { IconTrash } from "@tabler/icons";
import {
  //addProductToCart,
  removeAllProductsFromCart,
  removeProductFromCart,
} from "../../../lib/cartLib";

import "./cart-table.css";

// https://ui.mantine.dev/component/table-sort

export default function Cart({ cartData, mutate }) {
  const abbreviateText = useMediaQuery("(max-width: 576px)");

  const handleRemoveProduct = async (id, quantity) => {
    const data = await removeProductFromCart(id, quantity);
    mutate();
  };
  const handleRemoveAllProducts = async () => {
    const data = await removeAllProductsFromCart();
    mutate();
  };

  const { products } = cartData;
  const rows = products.map((element) => (
    <tr key={element.title}>
      <td>{element.title}</td>
      <td style={{ textAlign: "center" }}>{element.quantity}</td>
      <td>${element.price}</td>
      <td>${element.price * element.quantity}</td>
      <td>
        <ActionIcon
          color="red"
          onClick={() =>
            handleRemoveProduct(element.productId, -1 * element.quantity)
          }
        >
          <IconTrash size={16} stroke={1.5} />
        </ActionIcon>
      </td>
    </tr>
  ));

  const ths = (
    <tr>
      <th>Product</th>
      <th>{abbreviateText ? "Qty." : "Quantity"}</th>
      <th>Unit</th>
      <th>Total</th>
      <th></th>
    </tr>
  );

  return (
    <>
      <Card shadow="sm" mb="md" p="xs" radius="md" withBorder>
        <Table captionSide="top" mb="sm" withColumnBorders highlightOnHover>
          {/* <caption>Products in your Shopping Cart</caption> */}
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
          {products.length > 5 && <tfoot>{ths}</tfoot>}
        </Table>
      </Card>

      <Flex justify="space-between" direction="row" wrap="wrap">
        <Card
          shadow="sm"
          p="xs"
          radius="md"
          withBorder
          sx={{ height: "fit-content" }}
        >
          <Button
            color="red"
            onClick={async () => await handleRemoveAllProducts()}
          >
            Empty Cart
          </Button>
        </Card>

        <Card shadow="sm" p="xs" radius="md" withBorder>
          <Flex
            gap={{ base: "xs", sm: "md" }}
            align="center"
            direction={{
              base: "column",
              sm: "row",
            }}
            wrap="wrap"
          >
            <Text size="md" weight={500}>
              Total: $
              {products.reduce(
                (total, product) =>
                  (total = total + product.price * product.quantity),
                0
              )}
            </Text>
            <Button onClick={async () => await sendNewOrder()}>
              Create Order
            </Button>
          </Flex>
        </Card>
      </Flex>
      <Flex mt="sm" justify="flex-end" direction="row" wrap="wrap"></Flex>
    </>
  );
}
