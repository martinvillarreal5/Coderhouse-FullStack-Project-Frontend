import axios from 'axios'

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { useNavigate } from "react-router-dom";

import { Button, Input, Text } from "@mantine/core";

import useUser from "../../../hooks/useUser";
import schema from '../../../schemas/register-schema';



export default function RegisterForm() {
    //Make a rehusable component
    //IDEA: use a high order comp for login and register with a base form comp
    const { register, formState: { errors }, handleSubmit } = useForm({
        resolver: zodResolver(schema),
    });
    const { isLoading, loggedOut, mutate } = useUser()
    const [buttonLoading, setButtonLoading] = useState(false)
    const navigate = useNavigate()
    const [authError, setAuthError] = useState(false)

    useEffect(() => {
        if (!loggedOut) {
            navigate("/account/profile")
        }
    }, [loggedOut])
    const onSubmit = async (data) => {
        try {
            setButtonLoading(true)
            const authResponse = await axios.post('http://localhost:8080/user/login', data)
            console.log(authResponse.data);
            mutate()
            //if (authResponse.status)

        } catch (error) {
            setAuthError(true) // 
            setButtonLoading(false)
            // console.log(error);
        }
    };
    if (isLoading) {
        return <Text>Loading...</Text>
    }
    if (loggedOut) {
        return (
            <>
                {authError ? <Text pb="sm" color="red">Wrong Credentials</Text> : null}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input.Wrapper pb="sm"
                        error={
                            errors.username && <p role="alert">{errors.username?.message}</p>
                        }
                    >
                        <Input
                            onFocus={() => setAuthError(false)}
                            placeholder="Your Username"
                            {...register("username")}
                            aria-invalid={ errors.username ? "true" : "false" }
                        />
                    </Input.Wrapper>
                    <Input.Wrapper pb="sm"
                        error={
                            errors.email && <p role="alert">{errors.email?.message}</p>
                            }
                    >
                        <Input
                            onFocus={() => setAuthError(false)}
                            placeholder="Your Email"
                            {...register("email")}
                            aria-invalid={
                                errors.email ? "true" : "false"
                            }
                        />
                    </Input.Wrapper>
                    <Input.Wrapper pb="sm"
                        error={
                            errors?.password && <p role="alert">{errors.password?.message}</p>
                            }
                    >
                        <Input
                            onFocus={() => setAuthError(false)}
                            placeholder="Password"
                            {...register("password")}
                            aria-invalid={
                                errors.password ? "true" : "false"
                            }
                        />
                    </Input.Wrapper>

                    <Button type="submit" loading={buttonLoading}>
                        Submit
                    </Button>
                </form>
            </>
        );
    } else {
        return (<Text>Redirecting...</Text>)
    }

}