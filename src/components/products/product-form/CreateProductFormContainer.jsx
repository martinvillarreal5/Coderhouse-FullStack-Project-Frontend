// TODO : Use high order component configure if this is for update or create
import { useEffect, useState } from "react";
import { Text, Title } from "@mantine/core";
import CreateProductForm from "./CreateProductForm.jsx";
import { createProduct } from "../../../lib/productLib.js";
import schema from "../../../schemas/product-schema.js";

//TODO add confirmation

export default function CreateProductFormContainer() {
  const [isWaiting, setIsWaiting] = useState(false);
  const handleAddProduct = async (
    data
    //formMethods //TODO pass here any reset, dirtyfields, etc
  ) => {
    try {
      setIsWaiting(true);
      const newProduct = await createProduct(data);
      console.log(newProduct);
      setIsWaiting(false);
      //Show Success alert
    } catch (error) {
      setIsWaiting(false);
      //Show error alert
      console.log(error);
    }
  };

  return (
    <>
      <Title order={2} weight={500} mb="sm">
        Add a new product
      </Title>
      <CreateProductForm
        waitingResponse={isWaiting}
        submitText="Add Product to database"
        handleOnSubmit={handleAddProduct}
        zodSchema={schema}
      />
    </>
  );
}
