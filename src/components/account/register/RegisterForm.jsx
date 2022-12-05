import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Input,
  Text,
  FileInput,
  Avatar,
  TextInput,
} from "@mantine/core";

import useUser from "../../../hooks/useUser";
import schema from "../../../schemas/register-schema";
import { SignUp } from "../../../lib/authLib";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

//TODO set message when username or mail is already in use

export default function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: zodResolver(schema),
    criteriaMode: "all",
  });
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [imgFile, setImgFile] = useState();
  const { isLoading, isLogged } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogged) {
      navigate("/account/profile");
    }
  }, [isLogged]);

  function handleChange(file) {
    file ? setImgFile(URL.createObjectURL(file)) : setImgFile(null);
  }
  const handleSignUp = async (data) => {
    try {
      setWaitingResponse(true);
      const response = await SignUp(data);
    } catch (error) {
      setAuthError(true); //
      setWaitingResponse(false);
      console.log(error);
      return;
    }
    navigate("/account/login");
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
  if (!isLogged) {
    return (
      <>
        {authError ? (
          <Text pb="sm" color="red">
            Wrong Credentials
          </Text>
        ) : null}
        <form onSubmit={handleSubmit(handleSignUp)}>
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
            label="First Name"
            pb="sm"
            disabled={waitingResponse}
            error={errors.firstName && errors.firstName?.message}
            onFocus={() => setAuthError(false)}
            placeholder="Your First Name"
            {...register("firstName")}
            aria-invalid={errors.firstName ? "true" : "false"}
          />
          <TextInput
            withAsterisk
            label="Last Name"
            pb="sm"
            disabled={waitingResponse}
            error={errors.lastName && errors.lastName?.message}
            onFocus={() => setAuthError(false)}
            placeholder="Your Last Name"
            {...register("lastName")}
            aria-invalid={errors.lastName ? "true" : "false"}
          />
          <TextInput
            withAsterisk
            label="Password"
            description="Password be at least 8 characters long and include at least one uppercase letter, lowercase letter, number and special character"
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
            placeholder="Password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          <Controller
            control={control}
            name="avatar"
            render={({ field: { onChange, value } }) => (
              <FileInput
                withAsterisk
                label="Avatar picture"
                disabled={waitingResponse}
                error={errors?.avatar && errors.avatar?.message}
                placeholder="Upload your avatar"
                onChange={(e) => {
                  onChange(e);
                  handleChange(e);
                }}
                value={value}
                accept="image/png,image/jpeg"
              />
            )}
          />
          {imgFile ? (
            <>
              <Text pb="1">Your selected image: </Text>
              <Avatar
                src={imgFile}
                alt="my uploaded image"
                size={150}
                radius="xl"
              />
            </>
          ) : null}
          <Input.Wrapper
            pt="sm"
            pb="sm"
            disabled={waitingResponse}
            error={errors?.phone && <p role="alert">{errors.phone?.message}</p>}
            label="Phone"
            withAsterisk
          >
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  placeholder="Enter phone number"
                  value={value}
                  defaultCountry="AR"
                  onChange={onChange}
                  international
                  countryCallingCodeEditable={false}
                />
              )}
            />
          </Input.Wrapper>
          <Button type="submit" loading={waitingResponse}>
            Submit
          </Button>
        </form>
      </>
    );
  } else {
    return <Text>Redirecting...</Text>;
  }
}
