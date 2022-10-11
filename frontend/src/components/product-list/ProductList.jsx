import ProductCard from "./ProductCard";

import { Grid } from "@mantine/core";

export default function ProductList({ products, isLogged }) {
  return (
    <>
      <Grid justify="center" align="center" columns={24}>
        {products.map((product) => {
          return (
            <Grid.Col cols={24} sm={12} key={product.id}>
              <ProductCard productData={product} isLogged={isLogged} />
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
}
