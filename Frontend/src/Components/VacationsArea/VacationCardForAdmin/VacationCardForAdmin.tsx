import VacationModel from "../../../Models/VacationModel";
import "./VacationCardForAdmin.css";
import swal from "sweetalert";
import appConfig from "../../../Utils/Config";
import DeleteIcon from '@mui/icons-material/Delete';
import vacationsService from "../../../Services/VacationsService";
import { NavLink, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import edit from "../../../Assets/Images/edit.png";
import { useEffect, useState } from "react";
import { vacationsStore } from "../../../Redux/VacationsState";
import notifyService from "../../../Services/NotifyService";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCardForAdmin(props: VacationCardProps): JSX.Element {

    // Short syntax - using Destructuring Assignment:
    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // Function redirect to another page:
    const navigate = useNavigate();

    function showDescription(vacation: VacationModel) {
        swal(vacation.description);

    }

    // Delete vacation:
    async function deleteVacation(vacationId: number) {

        try {
            await vacationsService.deleteVacation(vacationId);
            swal({
                title: "Vacation deleted successfully",
                icon: "success"
            });
            // Function redirect to another page:
            navigate("/vacations");

        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    // useEffect performing once - perform once when component is ready for use:
    useEffect(() => {
        // Listen to any change in the vacations global state:
        const unsubscribe = vacationsStore.subscribe(() => {
            let duplicateVacations = [...vacations];
            setVacations(duplicateVacations);

            return () => unsubscribe();
        });

    }, []);

    return (
        <div className="VacationCardForAdmin">
            <div className="Container">
                <IconButton aria-label="delete" onClick={() => deleteVacation(props.vacation.vacationId)}>
                    <DeleteIcon />
                </IconButton>
                <button className="EditBtn"><NavLink to={"/vacations/edit/" + props.vacation?.vacationId}><img className="Edit" src={edit} /></NavLink></button>
                <p>Destination: {props.vacation.destination}</p>
                <p>Check In: {props.vacation.checkIn}</p>
                <p>Check Out: {props.vacation.checkOut}</p>
                <p>Price: {props.vacation.price}$</p>
                <img crossOrigin="anonymous" src={appConfig.vacationsImageUrl + props.vacation.imageName} />
                <br /><br />
                <button className="Description" onClick={() => showDescription(props.vacation)}>More info</button>
            </div>
        </div>
    );
}

export default VacationCardForAdmin;
