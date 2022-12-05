import { Navbar, NavLink } from "@mantine/core";
import { Link } from "react-router-dom";
import { logOut } from "../../lib/authLib";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export default function NavBar(props) {
  const { opened } = props;
  const navigate = useNavigate();
  const { user, isLoading, mutate, isLogged, isAdmin } = useUser();

  let accountSection = null;
  let adminSection = null;
  let avatarSection = null;

  if (isLoading) {
    accountSection = <NavLink label="Loading..." />;
  } else if (isLogged) {
    avatarSection = <></>; //TODO
    accountSection = (
      <>
        <NavLink component={Link} to="/account/profile" label="Profile" />
        <NavLink component={Link} to="/account/cart" label="My Cart" />
        <NavLink
          component={Link}
          to="/account/global-chat"
          label="Global Chat"
        />
        <NavLink
          sx={{ color: "#fa5252" }}
          label="Log Out"
          onClick={async () => {
            await logOut();
            navigate("/account/login");
            mutate(null);
          }}
        />
      </>
    );
    if (isAdmin) {
      adminSection = (
        <NavLink label="Admin" defaultOpened>
          <NavLink
            component={Link}
            to="/products/admin/create"
            label="Add Product"
          />
        </NavLink>
      );
    }
  } else {
    accountSection = (
      <>
        <NavLink component={Link} to="/account/login" label="Log In" />
        <NavLink component={Link} to="/account/signup" label="Sign Up" />
      </>
    );
  }
  return (
    <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 175, lg: 250 }}>
      <NavLink component={Link} to="/products" label="Products" />
      <NavLink label="Account" defaultOpened>
        {accountSection}
      </NavLink>
      {adminSection}
    </Navbar>
  );
}
