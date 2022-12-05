import { useForm } from "react-hook-form";
import { Button, TextInput, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "../../../schemas/login-schema.js";
import useUser from "../../../hooks/useUser";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    criteriaMode: "all",
  });
  const [authError, setAuthError] = useState(false);
  const [waitingResponse, setWaitingResponse] = useState(false);
  const { isLoading, isLogged, mutate } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/account/profile");
    }
  }, [isLogged]);

  const onSubmit = async (data) => {
    try {
      setWaitingResponse(true);
      const authResponse = await axios.post(
        "http://localhost:8080/user/login",
        data
      );
      console.log(authResponse.data);
      mutate();
    } catch (error) {
      setAuthError(true);
      setWaitingResponse(false);
      // console.log(error);
    }
  };

  const mapStrengthMeterErrors = (errors) => {
    if (errors) {
      if (Array.isArray(errors)) {
        return errors.map((message) => <Text key={message}>{message}</Text>);
      } else {
        return errors;
      }
    } else {
      return null;
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isLogged) {
    return <Text>User is already logged in, redirecting...</Text>;
  }
  return (
    <>
      <Text pb="sm">Log In</Text>
      {authError ? (
        <Text pb="sm" color="red">
          Wrong Credentials
        </Text>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          pb="sm"
          disabled={waitingResponse}
          error={errors.email && errors.email?.message}
          onFocus={() => setAuthError(false)}
          placeholder="Your Email"
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        <TextInput
          withAsterisk
          label="Password"
          pb="sm"
          disabled={waitingResponse}
          error={
            errors?.password && (
              <>
                {errors.password?.types.too_small ? (
                  <Text>{errors.password.message}</Text>
                ) : null}
                {mapStrengthMeterErrors(errors.password.types.invalid_string)}
              </>
            )
          }
          onFocus={() => setAuthError(false)}
          placeholder="Your Password"
          {...register("password")}
          aria-invalid={errors.password ? "true" : "false"}
        />

        <Button type="submit" loading={waitingResponse}>
          Submit
        </Button>
      </form>
    </>
  );
}
