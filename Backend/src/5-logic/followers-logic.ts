import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import FollowerModel from "../4-models/follower-model";

// Add new follower: 
async function addFollower(follower: FollowerModel): Promise<void> {

    //Validation:
    const error = follower.validate();
    if (error) throw new ValidationError(error);

    // Query:
    const sql = `INSERT INTO followers VALUES(?, ?)`;

    await dal.execute(sql, [follower.userId, follower.vacationId]);

}

// Delete exist follower:
async function deleteFollower(vacationId: number, userId: number): Promise<void> {

    // Query:
    const sql = `DELETE FROM followers WHERE vacationId = ? AND userId = ?`;

    // Execute: 
    const info: OkPacket = await dal.execute(sql, [vacationId, userId]);

    // If not exist:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId || userId);

}

export default {
    addFollower,
    deleteFollower
};