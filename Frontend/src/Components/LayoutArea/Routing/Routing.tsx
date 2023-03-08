import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import FollowersGraph from "../../VacationsArea/FollowersGraph/FollowersGraph";
import VacationsList from "../../VacationsArea/VacationList/VacationsList";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>

                {/* Register */}
                <Route path="/register" element={<Register />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* Logout */}
                <Route path="/logout" element={<Logout />} />

                {/* Vacations */}
                <Route path="/vacations" element={<VacationsList />} />

                {/* Add vacation */}
                <Route path="/add-vacation" element={<AddVacation />} />

                {/* Edit vacation */}
                <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />

                {/* Followers graph */}
                <Route path="/vacations/graph" element={<FollowersGraph />} />

                {/* Default Route: */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Page Not Found: */}
                <Route path="*" element={<PageNotFound />} />

            </Routes>

        </div>
    );
}

export default Routing;
