import { Button, Table, Text, ActionIcon, ThemeIcon } from "@mantine/core";
import { sendNewOrder } from "../../../lib/orderLib";
import { IconTrash } from "@tabler/icons";
import { addProductToCart, removeProductFromCart } from "../../../lib/cartLib";

//import { useEffect } from "react";

// implement something like this https://ui.mantine.dev/component/table-scroll-area
// and this https://ui.mantine.dev/component/table-sort

export default function Cart({ cartData, mutate }) {
  /* useEffect(() => {
    if (loggedOut) {
      navigate("/account/login");
    }
  }, [loggedOut]); */

  const handleDeleteProduct = async (id, quantity) => {
    const data = await removeProductFromCart(id, quantity);
    mutate();
  };

  const { products } = cartData;
  const rows = products.map((element) => (
    <tr key={element.title}>
      <td>{element.title}</td>
      <td>{element.quantity}</td>
      <td>${element.price}</td>
      <td>${element.price * element.quantity}</td>
      <td>
        <ActionIcon
          color="red"
          onClick={() =>
            handleDeleteProduct(element.productId, -1 * element.quantity)
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
      <th>Quantity</th>
      <th>Unit</th>
      <th>Total</th>
      <th></th>
    </tr>
  );

  return (
    <>
      <Table captionSide="bottom" mb="sm">
        <caption>Products in your Shopping Cart</caption>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
        {products.length > 5 && <tfoot>{ths}</tfoot>}
      </Table>
      <Text size="xl" weight={750} mb="sm">
        Total: $
        {products.reduce(
          (total, product) =>
            (total = total + product.price * product.quantity),
          0
        )}
      </Text>
      <Button onClick={async () => await sendNewOrder()}>Create Order</Button>
    </>
  );
}
