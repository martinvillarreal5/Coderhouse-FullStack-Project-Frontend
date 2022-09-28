import ProductList from "./ProductList.jsx"

const products = [
    {
        id: 1,
        title: "cosa1",
        prize: 1,
    },
    {
        id: 2,
        title: "cosa2",
        prize: 1,
    }
]
function ProductListContainer() {

    return (
        <>
          <ProductList products={products}></ProductList> 
        </>
    )
}


export default ProductListContainer