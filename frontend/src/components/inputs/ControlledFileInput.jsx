import { Controller } from "react-hook-form";
import { FileInput } from "@mantine/core";

export default function ControlledFileInput({
  //handleOnChange,
  errors,
  control,
  controlName,
  label,
  ...rest
}) {
  // TODO research if Controller is really necesary
  return (
    <Controller
      control={control}
      name={controlName}
      render={({ field: { onChange, value } }) => (
        <FileInput
          label={label}
          error={errors && errors?.message}
          onChange={(e) => {
            onChange(e);
            //handleOnChange(e);
          }}
          value={value}
          accept="image/png,image/jpeg"
          {...rest}
        />
      )}
    />
  );
}
