import { Text } from "@mantine/core";

export default function ProductDetail({ product }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <Text size="xl">{capitalizeFirstLetter(product.title)}</Text>
    </>
  );
}
