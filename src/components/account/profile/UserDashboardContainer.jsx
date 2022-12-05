import UserDashboard from "./UserDashboard";
import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import { useEffect } from "react";

export default function UserDashboardContainer() {
  const { user, isLoading, isLogged, mutate } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/account/login");
    }
  }, [isLogged]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (!isLogged) {
    return <Text>User is not logged in, redirecting...</Text>;
  }

  if (isLogged) {
    return (
      <>
        <UserDashboard userData={user} />
      </>
    );
  }
}
