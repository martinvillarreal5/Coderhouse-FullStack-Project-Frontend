import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import HookFormTextInput from "../../inputs/HookFormTextInput.jsx";
import HookFormTextAreaInput from "../../inputs/HookFormTextAreaInput.jsx";
import HookFormNumberInput from "../../inputs/HookFromNumberInput.jsx";
import ControlledFileInput from "../../inputs/ControlledFileInput.jsx";
import { Button } from "@mantine/core";

// TODO add image preview

export default function ProductForm(props) {
  const {
    initialValues = {},
    handleOnSubmit,
    submitText,
    waitingResponse,
    zodSchema,
  } = props;
  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    control,
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: initialValues,
    shouldUnregister: true,
  });
  const onSubmit = async (values, dirtyFields) => {};

  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <HookFormTextInput
          disabled={waitingResponse}
          label="Title"
          withAsterisk
          register={register}
          registerName="title"
          errors={errors?.title}
        />
        <HookFormTextInput //TODO make a multi select and save as array
          label="Category"
          withAsterisk
          disabled={waitingResponse}
          register={register}
          registerName="category"
          errors={errors?.category}
        />
        <HookFormTextAreaInput
          label="Description"
          withAsterisk
          disabled={waitingResponse}
          register={register}
          registerName="description"
          errors={errors?.description}
          autosize
          minRows={2}
          maxRows={4}
        />

        <HookFormNumberInput
          label="Price"
          withAsterisk
          disabled={waitingResponse}
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
          //icon={"$"}
        />
        <HookFormNumberInput
          label="Stock"
          withAsterisk
          disabled={waitingResponse}
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
          //icon={"💲"}
        />
        <ControlledFileInput
          label="Picture"
          placeholder="Click to upload the product picture"
          withAsterisk
          disabled={waitingResponse}
          controlName="picture"
          control={control}
          errors={errors?.picture}
          mb="sm"
        />
        <Button type="submit" loading={waitingResponse}>
          {submitText}
        </Button>
      </form>
    </>
  );
}
