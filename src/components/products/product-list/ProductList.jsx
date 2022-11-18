import ProductCard from "./ProductCard";

import { Grid } from "@mantine/core";

export default function ProductList({ products, isLogged }) {
  return (
    <>
      <Grid justify="center" align="flex start" columns={24}>
        {products.map((product) => {
          return (
            <Grid.Col cols={24} xs={12} lg={8} key={product.id}>
              <ProductCard productData={product} isLogged={isLogged} />
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
}
