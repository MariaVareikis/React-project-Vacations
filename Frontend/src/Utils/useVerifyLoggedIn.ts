import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Redux/AuthState";
import notifyService from "../Services/NotifyService";

// Custom Hook
function useVerifyLoggedIn() {

    // Function redirect to another page:
    const navigate = useNavigate();

    // useEffect performing once - perform once when component is ready for use:
    useEffect(() => {

        // If we don't have token
        if (!authStore.getState()?.token) {
            notifyService.error("You are not logged in!");

            // Function redirect to another page:
            navigate("/login");
        }

    }, []);

}

export default useVerifyLoggedIn;