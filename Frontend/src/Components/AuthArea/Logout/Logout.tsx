import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import swal from "sweetalert";

function Logout(): JSX.Element {

    // Function redirect to another page:
    const navigate = useNavigate();

    // useEffect performing once - perform once when component is ready for use:
    useEffect(() => {

        authService.logout();

        swal("Bye bye....");

        // Function redirect to another page:
        navigate("/login");


    }, []);

    return null;
}

export default Logout;

