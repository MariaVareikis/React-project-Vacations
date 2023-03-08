import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import "./VacationsList.css";
import swal from "sweetalert";
import UserModel from "../../../Models/UserModel";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import { authStore } from "../../../Redux/AuthState";
import Spinner from "../../SharedArea/Spinner/Spinner";
import { VacationsActionType, vacationsStore } from "../../../Redux/VacationsState";
import VacationCardForUser from "../VacationCardForUser/VacationCardForUser";
import VacationCardForAdmin from "../VacationCardForAdmin/VacationCardForAdmin";
import Switch from "@mui/material/Switch";
import notifyService from "../../../Services/NotifyService";

function VacationsList(): JSX.Element {

    useVerifyLoggedIn();

    // Short syntax - using Destructuring Assignment:
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    let user: UserModel = authStore.getState().user;

    // Use state for followed checkbox in function showVacations:
    const [showFollowed, setShowFollowed] = useState<boolean>(false);

    // useEffect performing once - perform once when component is ready for use:
    useEffect(() => {

        // If userRole is user:
        if (user?.roleId === 2) {
            vacationsStore.dispatch({ type: VacationsActionType.EmptyVacations, payload: [] });
            // Get all vacations for user:
            vacationsService.getAllVacationsForUser(user.userId)
                .then(vacations => {
                    setVacations(vacations);
                })
                .catch(err => notifyService.error(err));
        }
        // If userRole is admin:
        else {
            // vacationsStore.dispatch({ type: VacationsActionType.EmptyVacations, payload: [] });
            // Get all vacations for admin:
            vacationsService.getAllVacationsForAdmin()
                .then(vacations => setVacations(vacations))
                .catch(err => notifyService.error(err));
        }

    }, []);

    // Function show vacations followed by user: 
    async function showVacations() {
        try {
            vacationsStore.dispatch({ type: VacationsActionType.EmptyVacations, payload: [] });
            const vacations = await vacationsService.getAllVacationsForUser(user.userId);

            if (showFollowed) {
                setVacations(vacations.filter(v => v.isFollowing))
            }
            else {
                setVacations(vacations);
            }

        } catch (err: any) {
            notifyService.error(err);
        }
    }

    // useEffect performing once - perform once when component is ready for use:
    useEffect(() => {
        showVacations();
    }, [showFollowed])

    // Pagination:
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = vacations.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        showVacations();
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = vacations.slice(startIndex, endIndex);

    return (
        <div className="VacationsList">
            {/* If we don't have vacations we will see spinner: */}
            {vacations.length === 0 && <Spinner />}

            {/* If thats is user: */}
            {user?.roleId === 2 && <>
                <div className="FollowedVacations">
                    Followed Vacations
                    <Switch onChange={() => setShowFollowed(!showFollowed)} checked={showFollowed} onClick={() => handlePageChange(1)} />
                </div>

                {/* Show vacation cards for user: */}
                <div className="Container">
                    {currentItems.map((v) => (
                        <div className="UserVacations" key={v.vacationId}>
                            <VacationCardForUser vacation={v} updateVacations={() => showVacations()} />
                        </div>
                    ))}
                </div>
            </>}

            {/* If thats admin: */}
            {user?.roleId === 1 && <>

                <div className="AdminsContainer">
                    {/* Show vacation cards for admin: */}
                    {currentItems.map((v) => (
                        <div className="AdminVacations" key={v.vacationId}>
                            <VacationCardForAdmin vacation={v} />
                        </div>
                    ))}
                </div>
            </>}

            {/* Pagination: */}
            <div className="Pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages} </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

        </div>

    );
}

export default VacationsList;