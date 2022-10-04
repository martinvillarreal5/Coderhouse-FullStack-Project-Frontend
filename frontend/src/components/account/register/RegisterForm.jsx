import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Input,
  Text,
  Image,
  FileInput,
  TextInput,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import useUser from "../../../hooks/useUser";
import schema from "../../../schemas/register-schema";
import { SignUp } from "../../../lib/authLib";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

//TODO add disabled state tp inputs when sending request

//TODO set message when username or mail is already in use

export default function RegisterForm() {
  //TODO Make a rehusable input component for text fields,
  //IDEA: use a high order comp for login and register with a base form comp
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const { isLoading, loggedOut } = useUser();
  const [waitingResponse, setWaitingResponse] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [imgFile, setImgFile] = useState();
  function handleChange(file) {
    file ? setImgFile(URL.createObjectURL(file)) : setImgFile(null);
  }

  /*   useEffect(() => {
    if (loggedOut === false) {
      navigate("/account/profile");
    }
  }, [loggedOut]); */
  const onSubmit = async (data) => {
    try {
      setWaitingResponse(true);
      SignUp(data);
      navigate("/account/login");
      //if (authResponse.status)
    } catch (error) {
      setAuthError(true); //
      setWaitingResponse(false);
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
          <TextInput
            withAsterisk
            label="Username"
            pb="sm"
            disabled={waitingResponse}
            error={errors.username && errors.username?.message}
            onFocus={() => setAuthError(false)}
            placeholder="Your Username"
            {...register("username")}
            aria-invalid={errors.username ? "true" : "false"}
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
            description="Password must include at least one uppercase letter, lowercase letter, number and special character"
            pb="sm"
            disabled={waitingResponse}
            error={errors?.password && errors.password?.message}
            onFocus={() => setAuthError(false)}
            placeholder="Password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          <Controller
            control={control}
            name="avatar"
            //rules={{}}
            render={({ field: { onChange, value } }) => (
              <FileInput
                withAsterisk
                label="Avatar picture"
                disabled={waitingResponse}
                error={errors?.avatar && errors.avatar?.message}
                pb="sm"
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
          {imgFile ? <Image src={imgFile} pb="sm" /> : null}
          <Input.Wrapper
            pb="sm"
            disabled={waitingResponse}
            error={errors?.phone && <p role="alert">{errors.phone?.message}</p>}
          >
            <Controller
              control={control}
              name="phone"
              //rules={{}}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  //{...field}
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
