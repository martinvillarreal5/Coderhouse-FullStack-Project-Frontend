import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { updateProduct } from "../../../lib/productLib.js";
import HookFormTextInput from "../../inputs/HookFormTextInput.jsx";
import HookFormTextAreaInput from "../../inputs/HookFormTextAreaInput.jsx";
import HookFormNumberInput from "../../inputs/HookFromNumberInput.jsx";
import ControlledFileInput from "../../inputs/ControlledFileInput.jsx";
import { Button } from "@mantine/core";

export default function ProductForm(props) {
  const { initialValues = {}, zodSchema, id } = props;

  const [isWaiting, setIsWaiting] = useState(false);
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: initialValues,
  });
  const handleOnSubmit = async (values) => {
    //TODO move this to container, or move useForm to container and use a formContext
    //pass this function an object like this {errors: errors, reset: reset,...etc} ?
    try {
      setIsWaiting(true);
      const submitData = values;
      const dirtyFieldsArray = Object.keys(dirtyFields);
      if (dirtyFieldsArray.length < 1) {
        throw new Error("No fields were modified");
      }
      const updateData = dirtyFieldsArray.reduce((updateData, key) => {
        updateData[key] = submitData[key];
        return updateData;
      }, {});
      //! TODO test if instead of doing all of the above, just using the dirtyfield would work
      const updatedProduct = await updateProduct(id, updateData);
      console.log(updatedProduct);
      reset(values, {
        keepErrors: true,
        keepValues: true,
      });
      setIsWaiting(false);
    } catch (error) {
      /* reset(values, {
        keepValues: true,
      }); */
      // ! TODO: config reset right
      //TODO If api call didnt work show an error message to user
      setIsWaiting(false);
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <HookFormTextInput
          disabled={isWaiting}
          label="Title"
          register={register}
          registerName="title"
          errors={errors?.title}
        />
        <HookFormTextInput
          label="Category"
          disabled={isWaiting}
          register={register}
          registerName="category"
          errors={errors?.category}
        />
        <HookFormTextAreaInput
          label="Description"
          disabled={isWaiting}
          register={register}
          registerName="description"
          errors={errors?.description}
          autosize
          minRows={2}
          maxRows={4}
        />

        <HookFormNumberInput
          label="Price"
          disabled={isWaiting}
          control={control}
          controlName="price"
          errors={errors?.price}
          //defaultValue={0.0}
          min={0}
          decimalSeparator="."
          precision={2}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "").replace("-", "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "$ "
          }
        />
        <HookFormNumberInput
          label="Stock"
          disabled={isWaiting}
          control={control}
          controlName="stock"
          errors={errors?.stock}
          min={0}
          parser={(value) => value.replace(/\$\s?|(,*)/g, "").replace("-", "")}
          formatter={(value) =>
            !Number.isNaN(parseFloat(value))
              ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : ""
          }
        />
        <ControlledFileInput
          label="Picture"
          placeholder="Click to upload the product picture"
          disabled={isWaiting}
          controlName="picture"
          control={control}
          errors={errors?.picture}
          mb="sm"
        />
        <Button type="submit" loading={isWaiting}>
          Update Product
        </Button>
      </form>
    </>
  );
}
