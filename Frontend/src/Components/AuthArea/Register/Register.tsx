import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import "./Register.css";
import swal from 'sweetalert';
import notifyService from "../../../Services/NotifyService";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>();

    // Function redirect to another page:
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            swal("Welcome!");

            // Function redirect to another page:
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }

    }

    return (
        <div className="Register Box">
            <form onSubmit={handleSubmit(send)}>

                <label>First name: </label>
                <input type="text" {...register("firstName")} required />
                <span className="Error">{formState.errors.firstName?.message}</span>

                <label>Last name: </label>
                <input type="text" {...register("lastName")} required />
                <span className="Error">{formState.errors.lastName?.message}</span>

                <label>Username: </label>
                <input type="text" {...register("username")} required />
                <span className="Error">{formState.errors.username?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password")} required />
                <span className="Error">{formState.errors.password?.message}</span>

                <button>Register</button>

            </form>
        </div>
    );
}

export default Register;

