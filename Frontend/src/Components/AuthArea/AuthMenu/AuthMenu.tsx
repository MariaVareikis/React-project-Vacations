import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    // useEffect performing once - perform once when component is ready for use:
    useEffect(() => {

        setUser(authStore.getState().user);

        // Listen to any change in the auth global state:
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);

            return () => {

                // Unsubscribe:
                unsubscribe();

            };

        });

    }, []);

    return (
        <div className="AuthMenu">

            {/* If it's not user: */}
            {!user && <>
                <span>Hello Guest | </span>
                <NavLink to="/login">Login</NavLink>
                <span> | </span>
                <NavLink to="/register">Register</NavLink>
            </>}
            {/* If it's user: */}
            {user?.roleId === 2 && <>
                <span>Hello {user.firstName} {user.lastName} | </span>
                <NavLink to="/logout">Logout</NavLink>
            </>}
            {/* If it's admin: */}
            {user?.roleId === 1 && <>
                <span>Hello MariaDB | </span>
                <NavLink to="/logout">Logout</NavLink>
            </>
            }

        </div>
    );
}

export default AuthMenu;
