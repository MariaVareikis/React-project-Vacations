import axios from "axios";
import FollowerModel from "../Models/FollowerModel";
import { FollowersActionType, followersStore } from "../Redux/FollowersState";
import appConfig from "../Utils/Config";

class FollowersService {

    // Add follower
    public async addFollower(follower: FollowerModel): Promise<void> {

        // AJAX Request - Sending a new follower to add, receiving back the added follower - after adding to the database:
        const response = await axios.post<FollowerModel>(appConfig.followersUrl, follower);

        //To extract the added follower:

        const addedFollower = response.data;

        followersStore.dispatch({ type: FollowersActionType.AddFollower, payload: addedFollower });

    }

    // Delete follower
    public async deleteFollower(follower: FollowerModel): Promise<void> {

        await axios.delete<void>(appConfig.followersUrl + follower.vacationId + "/" + follower.userId);

        followersStore.dispatch({ type: FollowersActionType.DeleteFollower, payload: follower });
    }

}

const followersService = new FollowersService();

export default followersService;