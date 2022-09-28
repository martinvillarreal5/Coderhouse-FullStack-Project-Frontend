import UserDashboard from "./UserDashboard"
import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import useUser from "../../../hooks/useUser";
import { useEffect, useState } from "react";

/* const user = {
    firstName: "Martin",
    lastName: "Villarreal",
    username: "VillaDev",
    email: "martinvictorvillarreal@gmail.com"
} */

export default function UserDashboardContainer() {
    const { user, isLoading, loggedOut, mutate } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedOut) {
            navigate("/account/login")
        }
    }, [loggedOut])

    if (isLoading) {
        return <Text>Loading</Text>
    }

    if (!user && loggedOut) {
        return <Text>Redirecting...</Text>
    }

    if (user && !loggedOut) {
        return (
            <>
                <UserDashboard userData={user} />
            </>
        )
    }


}