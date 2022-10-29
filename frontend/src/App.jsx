import { useState } from "react";

import {
  MantineProvider,
  AppShell,
  Header,
  Text,
  MediaQuery,
  Burger,
  Aside,
  useMantineTheme,
  Container,
} from "@mantine/core";
import { Route, Routes, Link } from "react-router-dom";
import ProductListContainer from "./components/products/product-list/ProductListContainer.jsx";
import ProductDetailContainer from "./components/products/product-detail/ProductDetailContainer.jsx";
import CreateProductFormContainer from "./components/products/product-form/CreateProductFormContainer.jsx";
import UpdateProductFormContainer from "./components/products/product-form/UpdateProductFormContainer.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import UserDashboardContainer from "./components/account/profile/UserDashboardContainer.jsx";
import LoginForm from "./components/account/login/LoginForm.jsx";
import RegisterForm from "./components/account/register/RegisterForm.jsx";
import CartContainer from "./components/account/cart/CartContainer.jsx";

function App() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="md"
        navbar={<NavBar opened={opened} />}
        header={
          <Header height={70} p="md">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Text component={Link} to="/">
                Ecommerce
              </Text>
            </div>
          </Header>
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside
              p="md"
              hiddenBreakpoint="sm"
              width={{ sm: 175, lg: 250 }}
              sx={{ display: "none" }}
            >
              <Text>Application sidebar</Text>
            </Aside>
          </MediaQuery>
        }
      >
        <Container size="md" /* Main page here */>
          <Routes /* Routes here */>
            <Route path="/" element={<Text>Welcome</Text>} />
            <Route path="/products" element={<ProductListContainer />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailContainer />}
            />
            <Route
              path="/products/admin/create"
              element={<CreateProductFormContainer />}
            />
            <Route
              path="/products/admin/update/:productId"
              element={<UpdateProductFormContainer />}
            />
            <Route
              path="/account/profile"
              element={<UserDashboardContainer />}
            />
            <Route path="/account/login" element={<LoginForm />} />
            <Route path="/account/signup" element={<RegisterForm />} />
            <Route path="/account/cart" element={<CartContainer />} />
            <Route /* Non existent route */
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
