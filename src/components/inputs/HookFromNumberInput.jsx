import { NumberInput } from "@mantine/core";
import { Controller } from "react-hook-form";

// ? maybe implent a wrapper component instead?
// ? or pass the component as a prop

/* <NumberInput
      pb="sm"
      error={errors && errors.message}
      aria-invalid={errors ? "true" : "false"}
      {...register(registerName)}
      {...rest}
    /> */

export default function HookFormNumberInput({
  control,
  controlName,
  errors,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field: { onChange, value } }) => (
        <NumberInput
          pb="sm"
          error={errors && errors?.message}
          onChange={(e) => {
            onChange(e);
            //handleOnChange(e);
          }}
          value={value}
          {...rest}
        />
      )}
    />
  );
}
