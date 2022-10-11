import { useForm } from "react-hook-form";
import { Button, Input, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../../../hooks/useUser";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isLoading, loggedOut, mutate } = useUser();
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (!loggedOut) {
      navigate("/account/profile");
    }
  }, [loggedOut]);
  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      const authResponse = await axios.post(
        "http://localhost:8080/user/login",
        data
      );
      console.log(authResponse.data);
      mutate();

      //if (authResponse.status)
    } catch (error) {
      setAuthError(true); // Add a setAuthError(false) en onClick,focus, etc
      setButtonLoading(false);
      // console.log(error);
    }
  };
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (loggedOut) {
    return (
      <>
        {authError ? (
          <Text pb="sm" color="red">
            Wrong Credentials
          </Text>
        ) : null}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <Input.Wrapper
                    error={errors.username?.type === 'required' && <p role="alert">Username is required</p>}
                    pb="sm"
                >
                    <Input
                    onFocus={ () => setAuthError(false) }
                        placeholder="Your Username"
                        {...register("username", { required: true })}
                        aria-invalid={
                            errors.username ? "true" : "false"
                        }
                    />
                </Input.Wrapper> */}
          <Input.Wrapper
            error={
              errors.email?.type === "required" && (
                <p role="alert">Email is required</p>
              )
            }
            pb="sm"
          >
            <Input
              onFocus={() => setAuthError(false)}
              placeholder="Your Email"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"} //for accesibility
            />
          </Input.Wrapper>
          <Input.Wrapper
            error={
              errors.password?.type === "required" && (
                <p role="alert">Password is required</p>
              )
            }
            pb="sm"
          >
            <Input
              onFocus={() => setAuthError(false)}
              placeholder="Password"
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
            />
          </Input.Wrapper>

          <Button type="submit" loading={buttonLoading}>
            Submit
          </Button>
        </form>
      </>
    );
  } else {
    return <Text>Redirecting...</Text>;
  }
}
