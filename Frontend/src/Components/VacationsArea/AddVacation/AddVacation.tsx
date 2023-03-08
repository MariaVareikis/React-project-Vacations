import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import "./AddVacation.css";
import swal from "sweetalert";
import { useState } from "react";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import notifyService from "../../../Services/NotifyService";

function AddVacation(): JSX.Element {

    useVerifyLoggedIn();

    const currentDate = new Date().toISOString().split("T")[0];
    const { register, handleSubmit, formState } = useForm<VacationModel>();

    // Function redirect to another page:
    const navigate = useNavigate();

    async function send(vacation: VacationModel) {

        // Check if dates is legal:
        if (new Date(vacation.checkIn) > new Date(vacation.checkOut)) {
            return swal({
                title: "Check In can't be in the past!",
                icon: "error"
            });
        }
        // Add vacation:
        try {
            await vacationsService.addVacation(vacation);
            swal({
                title: "Vacation has been successfully added",
                icon: "success"
            });
            // Function redirect to another page:
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }

    }

    const [file, setFile] = useState<File>(null);
    const changeHandler = (e: any) => {
        const file1 = e.target.files[0];
        setFile(file1);
    }

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)}>

                <h2>Add vacation</h2>

                <label>Description: </label>
                <input type="text" required {...register("description", VacationModel.descriptionValidation)} />
                <span className="Error">{formState.errors.description?.message}</span>
                <br />

                <label>Destination: </label>
                <input type="text" required {...register("destination", VacationModel.destinationValidation)} />
                <span className="Error">{formState.errors.destination?.message}</span>
                <br />

                <label>Check In: </label>
                <input type="date" min={currentDate} required {...register("checkIn", VacationModel.checkInValidation)} />
                <span className="Error">{formState.errors.checkIn?.message}</span>
                <br />

                <label>Check Out: </label>
                <input type="date" min={currentDate} required {...register("checkOut", VacationModel.checkOutValidation)} />
                <span className="Error">{formState.errors.checkOut?.message}</span>
                <br />

                <label>Price: </label>
                <input type="number" required {...register("price", VacationModel.priceValidation)} />
                <span className="Error">{formState.errors.price?.message}</span>
                <br />

                <label>Image: </label>
                <input type="file" onChangeCapture={changeHandler} required accept="image/*" {...register("image")} />
                {file && <img src={URL.createObjectURL(file)} />}

                <button>Add</button>

            </form>
        </div>
    );
}

export default AddVacation;
