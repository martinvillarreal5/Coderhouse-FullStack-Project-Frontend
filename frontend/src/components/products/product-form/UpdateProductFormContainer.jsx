// TODO : Use high order component configure if this is for update or create
import { useEffect, useState } from "react";
import { Text, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

import UpdateProductForm from "./UpdateProductForm.jsx";
import useData from "../../../hooks/useData.js";
import schema from "../../../schemas/product-update-schema.js";

//TODO add confirmation
export default function UpdateProductFormContainer() {
  const { productId } = useParams();
  const {
    data: product,
    isError,
    isLoading,
  } = useData(`/products/${productId}`);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Error fetching data...</Text>;
  }

  return (
    <>
      <Title order={2} weight={500} mb="sm">
        Update Product Information
      </Title>
      <UpdateProductForm
        id={product.id}
        initialValues={{
          title: product.title,
          category: product.category,
          description: product.description,
          price: product.price,
          stock: product.stock,
          //picture: null,
        }}
        zodSchema={schema}
      />
    </>
  );
}
