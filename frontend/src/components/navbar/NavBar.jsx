import {
    Navbar,
    NavLink,
    Button
} from '@mantine/core';
import { useEffect } from 'react';

import { logOut } from '../../lib/authLib';

import {
    Link,
} from "react-router-dom";

import useUser from '../../hooks/useUser';

export default function NavBar(props) {
    const { opened } = props

    const { user, isLoading, mutate, loggedOut } = useUser()

    let profile = null;
    if (isLoading) {
        profile = <NavLink label="Loading..." />;
    }
    if (user) {
        profile = (
            <NavLink label="Account" opened={opened}>
                <NavLink component={Link} to="/account/profile" label="Profile" />
                <NavLink label="My Shopping Cart" />
                <NavLink component={Button}
                    label="Log Out"
                    onClick={async() => {
                        await logOut()
                        mutate(null)
                    }} />
            </NavLink>
        );
    }
    if (loggedOut) {
        profile = (
            <><NavLink component={Link} to="/account/login" label="Log In" /></>
        );
    }

    return (
        <Navbar hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 175, lg: 250 }}>
            <NavLink component={Link} to="/products" label="Products" />
            {
                profile
            }
        </Navbar>
    )
}

