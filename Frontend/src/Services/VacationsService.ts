import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/Config";

class VacationsService {

    // Get all vacations for admin:
    public async getAllVacationsForAdmin(): Promise<VacationModel[]> {

        // Take vacations from global store:
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {

            // AJAX Request:
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl);

            // Extract vacations: 
            vacations = response.data;

            // Save vacations to global state:
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        // Return vacations: 
        return vacations;
    }

    // Get all vacations for admin:
    public async getAllVacationsForUser(userId: number): Promise<VacationModel[]> {

        // Take vacations from global store:
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {

            // AJAX Request:
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl + userId);

            // Extract vacations: 
            vacations = response.data;

            // Save vacations to global state:
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }
        // Return vacations: 
        return vacations;
    }

    public async getOneVacation(vacationId: number): Promise<VacationModel> {

        let vacations = vacationsStore.getState().vacations;

        let vacation = vacations.find(v => v.vacationId === vacationId);

        if (!vacation) {
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
            vacation = response.data;
        }

        return vacation;
    }

    // Add vacation:
    public async addVacation(vacation: VacationModel): Promise<void> {

        const myFormData = new FormData(); // Can contain strings and / or files.
        myFormData.append("description", vacation.description);
        myFormData.append("destination", vacation.destination);
        // myFormData.append("imageName", vacation.imageName);
        myFormData.append("checkIn", vacation.checkIn);
        myFormData.append("checkOut", vacation.checkOut);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]); // image = FileList, image[0] = File

        // Sending object with file (the image):
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData);

        //To extract the added vacation:

        const addedVacation = response.data;

        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });

    }

    // Update vacation:

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const myFormData = new FormData(); // Can contain strings and / or files.
        myFormData.append("description", vacation.description);
        myFormData.append("destination", vacation.destination);
        myFormData.append("imageName", vacation.imageName);
        myFormData.append("checkIn", vacation.checkIn);
        myFormData.append("checkOut", vacation.checkOut);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]); // image = FileList, image[0] = File

        // Sending object with file (the image):
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, myFormData);

        //To extract the updated vacation:

        const updatedVacation = response.data;

        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
    }

    // Delete vacation
    public async deleteVacation(vacationId: number): Promise<void> {

        await axios.delete<void>(appConfig.vacationsUrl + vacationId);

        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });
    }

}

const vacationsService = new VacationsService();

export default vacationsService;