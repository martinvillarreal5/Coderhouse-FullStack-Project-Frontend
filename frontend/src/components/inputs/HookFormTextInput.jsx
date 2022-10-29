import { TextInput } from "@mantine/core";

export default function HookFormTextInput({
  register,
  registerName,
  errors,
  ...rest
}) {
  return (
    <TextInput
      pb="sm"
      error={errors && errors.message}
      aria-invalid={errors ? "true" : "false"}
      {...register(registerName)}
      {...rest}
    />
  );
}
