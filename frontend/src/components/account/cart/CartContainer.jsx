import useCart from "../../../hooks/useCart";
import { useEffect } from "react";
import { Text } from "@mantine/core";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

export default function CartContainer() {
  const navigate = useNavigate();
  const { cart, isError, isLoading, loggedOut } = useCart();

  useEffect(() => {
    if (loggedOut) {
      navigate("/account/login");
    }
  }, [loggedOut]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (!cart && loggedOut) {
    return <Text>Not logged in. Redirecting... </Text>;
  }

  if (isError) {
    if (isError.status === 204) {
      return <Text>User doesn't have a cart with products yet</Text>;
    }
    return <Text>Error fetching the data</Text>;
  }

  if (cart && !loggedOut) {
    //console.log(cart);
    return <Cart cartData={cart} />;
  }
}
