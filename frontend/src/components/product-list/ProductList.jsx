import ProductCard from "./ProductCard"
import { Grid } from '@mantine/core';

export default function ProductList({ products }) {

    return (
        <>
            <Grid justify="center" align="center" columns={24}>
                {
                    products.map((product) => {
                        return (
                            <Grid.Col cols={24} sm={12} key={product.id}>
                                <ProductCard  productData={product} />
                            </Grid.Col>)
                    })
                }
            </Grid>
        </>
    )
}