import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundError, ValidationError } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid"; // v4 function change to uuid name
import fs from "fs";

// Get all vacations for admin: 
async function getAllVacations(): Promise<VacationModel[]> {

    // Query:
    const sql = `SELECT DISTINCT
        V.vacationId, description, destination, imageName, DATE_FORMAT(checkIn,'%Y-%m-%d') AS checkIn, DATE_FORMAT(checkOut,'%Y-%m-%d') AS checkOut, price,
        EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId) AS isFollowing,
        COUNT(F.userId) AS followersAmount
        FROM vacations AS V LEFT JOIN followers AS F
        ON V.vacationId = F.vacationId 
        GROUP BY vacationId
        ORDER BY V.checkIn DESC`;

    // Execute:
    const vacations = await dal.execute(sql);

    // Return all vacations:
    return vacations;

}

async function getVacationsForUser(userId: number) {

    // Query: 
    const sql = `
    SELECT DISTINCT
        V.vacationId, description, destination, imageName, DATE_FORMAT(checkIn,'%Y-%m-%d') AS checkIn, DATE_FORMAT(checkOut,'%Y-%m-%d') AS checkOut, price,
        EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
        COUNT(F.userId) AS followersAmount
    FROM vacations AS V LEFT JOIN followers AS F
    ON V.vacationId = F.vacationId 
    GROUP BY vacationId
    ORDER BY V.checkIn DESC
    `;

    // Execute:
    const vacations = await dal.execute(sql, [userId]);

    // Return all vacations:
    return vacations;

}

async function getOneVacation(vacationId: number): Promise<VacationModel> {

    const sql = `SELECT * from vacations WHERE vacationId = ?`;

    const vacations = await dal.execute(sql, [vacationId]);

    const vacation = vacations[0];

    if (!vacation) throw new ResourceNotFoundError(vacationId);

    return vacation;

}

// Add new vacation: 
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    //Validation:
    const error = vacation.validate();
    if (error) throw new ValidationError(error);

    // Save image to disk if exist:
    if (vacation.image) {

        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;

    }

    // Query:
    const sql = `INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)`;

    const info: OkPacket = await dal.execute(sql, [vacation.description, vacation.destination, vacation.imageName, vacation.checkIn, vacation.checkOut, vacation.price]);

    vacation.vacationId = info.insertId;

    return vacation;

}

// Update existing vacation: 
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validation: 
    const error = vacation.validate();
    if (error) throw new ValidationError(error);

    // Save image to disk if exist:
    if (vacation.image) {

        // If we have a previous image:
        if (fs.existsSync("./src/1-assets/images/" + vacation.imageName)) {

            // Delete it:
            fs.unlinkSync("./src/1-assets/images/" + vacation.imageName);
        }
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    }

    // Query: 
    const sql = `
        UPDATE vacations SET 
            description = ?,
            destination = ?,
            imageName = ?,
            checkIn = ?,
            checkOut = ?,
            price = ?
        WHERE vacationId = ?
    `;

    // Execute: 
    const info: OkPacket = await dal.execute(sql, [vacation.description, vacation.destination, vacation.imageName, vacation.checkIn, vacation.checkOut, vacation.price, vacation.vacationId]);

    // If not exist:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Return:
    return vacation;
}

// Delete exist vacation:
async function deleteVacation(vacationId: number): Promise<void> {

    // Query:
    const sql = `DELETE FROM vacations WHERE vacationId = ?`;

    // Execute: 
    const info: OkPacket = await dal.execute(sql, [vacationId]);

    // If not exist:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

}

export default {
    getAllVacations,
    getVacationsForUser,
    getOneVacation,
    addVacation,
    updateVacation,
    deleteVacation
};


