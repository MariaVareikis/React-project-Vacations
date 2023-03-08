import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/Config";
import "./VacationCardForUser.css";
import swal from "sweetalert";
import FollowerModel from "../../../Models/FollowerModel";
import { useState } from "react";
import authService from "../../../Services/AuthService";
import followersService from "../../../Services/FollowersService";
import notifyService from "../../../Services/NotifyService";

interface VacationCardProps {
    vacation: VacationModel;
    updateVacations: () => void;
}

function VacationCardForUser(props: VacationCardProps): JSX.Element {

    const [followers, setFollowers] = useState(props.vacation.followersAmount);
    const [isFollowing, setIsFollowing] = useState(props.vacation.isFollowing);
    const { updateVacations } = props;

    // Function that add or delete follower:
    async function isFollow() {
        try {
            const vacationId = props.vacation.vacationId;
            const userId = await authService.getUserIdFromToken();

            const follower = new FollowerModel();
            follower.vacationId = vacationId;
            follower.userId = userId;

            if (isFollowing) {
                setIsFollowing(0);
                setFollowers(followers - 1);
                await followersService.deleteFollower(follower);
                updateVacations();
            } else {
                setIsFollowing(1);
                setFollowers(followers + 1);
                await followersService.addFollower(follower);
            }

        } catch (err: any) {
            notifyService.error(err);
        }
    }

    // Show description in pop-up:
    function showDescription(vacation: VacationModel) {
        swal(vacation.description);

    }

    return (
        <div className="VacationCardForUser">

            <div className="Container">

                <label className="ContainerBox">
                    <input type="checkbox"
                        defaultChecked={isFollowing === 1 ? true : false}
                        onClick={() => { isFollow() }} />
                    <div className="Checkmark"></div>
                </label>
                <span>{followers}</span>
                <p>Destination: {props.vacation.destination}</p>
                <p>Check In: {props.vacation.checkIn}</p>
                <p>Check Out: {props.vacation.checkOut}</p>
                <p>Price: {props.vacation.price}$</p>
                <img crossOrigin="anonymous" src={appConfig.vacationsImageUrl + props.vacation.imageName} />
                <br />
                <button className="Description" onClick={() => showDescription(props.vacation)}>More info</button>

            </div>

        </div>
    );
}

export default VacationCardForUser;
