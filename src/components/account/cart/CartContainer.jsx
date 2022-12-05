import { useEffect } from "react";
import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import Cart from "./Cart";
import useCart from "../../../hooks/useCart";

export default function CartContainer() {
  const navigate = useNavigate();
  const { cart, isError, isLoading, loggedOut, mutate } = useCart();

  useEffect(() => {
    if (loggedOut) {
      navigate("/account/login");
    }
  }, [loggedOut]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (loggedOut) {
    return <Text>User is not logged in, redirecting... </Text>;
  }

  if (isError) {
    if (isError.status === 204) {
      return <Text>You don't have a cart with products yet. </Text>;
      //TODO button link to products
    }
    return <Text>Error fetching the data</Text>;
  }

  if (cart && !loggedOut) {
    return <Cart cartData={cart} mutate={mutate} />;
  }
}
