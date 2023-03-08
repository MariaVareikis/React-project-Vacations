import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();

    // Function redirect to another page:
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {

            await authService.login(credentials);
            swal({
                title: "Welcome back!",
                icon: "success"
            });
            // Function redirect to another page:
            navigate("/vacations");

        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">
            <form onSubmit={handleSubmit(send)}>

                <label>Username: </label>
                <input type="text" {...register("username")} required />
                <span className="Error">{formState.errors.username?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password")} required />
                <span className="Error">{formState.errors.password?.message}</span>
                <br /><br /><br />

                <button>Login</button>
                <br /><br /><br />

                <NavLink to="/register">Don't have an account yet?</NavLink>

            </form>
        </div>
    );
}

export default Login;
