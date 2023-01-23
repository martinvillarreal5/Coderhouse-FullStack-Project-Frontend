import { useEffect } from "react";
import { Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      return (
        <>
          <Text mb={15}>You don't have a cart with products yet. </Text>
          <Button component={Link} to="/products">
            Start Shopping!
          </Button>
        </>
      );
    }
    return <Text>Error fetching the data</Text>;
  }

  if (cart && !loggedOut) {
    return <Cart cartData={cart} mutate={mutate} />;
  }
}
