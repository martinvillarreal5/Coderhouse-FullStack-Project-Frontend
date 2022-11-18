import { Textarea } from "@mantine/core";

// ? maybe implent a wrapper component instead?
// ? or pass the component as a prop

export default function HookFormTextAreaInput({
  register,
  registerName,
  errors,
  ...rest
}) {
  return (
    <Textarea
      pb="sm"
      error={errors && errors.message}
      aria-invalid={errors ? "true" : "false"}
      {...register(registerName)}
      {...rest}
    />
  );
}
