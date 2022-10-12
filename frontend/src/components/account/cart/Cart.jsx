import { Button, Table } from "@mantine/core";
import { sendNewOrder } from "../../../lib/cartLib";

// implement something like this https://ui.mantine.dev/component/table-scroll-area
// and this https://ui.mantine.dev/component/table-sort

export default function Cart({ cartData }) {
  const { products, ownerId } = cartData;
  const rows = products.map((element) => (
    <tr key={element.title}>
      <td>{element.title}</td>
      <td>{element.quantity}</td>
      <td>{element.price}</td>
      <td>{element.price * element.quantity}</td>
    </tr>
  ));

  const ths = (
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Unit Price</th>
      <th>Total Price</th>
    </tr>
  );

  return (
    <>
      <Table captionSide="bottom">
        <caption>Products in your Shopping Cart</caption>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
        {products.lenght > 5 && <tfoot>{ths}</tfoot>}
      </Table>
      <Button onClick={async () => await sendNewOrder()}>Create Order</Button>
    </>
  );
}
