class VacationModel {

    public vacationId: number;
    public description: string;
    public destination: string;
    public imageName: string;
    public checkIn: string;
    public checkOut: string;
    public price: number;
    public followersAmount: number;
    public image: FileList;
    public isFollowing: number;

    public static descriptionValidation = {
        required: { value: true, message: "Missing description" },
        minLength: { value: 10, message: "Description too short" },
        maxLength: { value: 1500, message: "Description too long" }
    }

    public static destinationValidation = {
        required: { value: true, message: "Missing destination" },
        minLength: { value: 2, message: "Destination too short" },
        maxLength: { value: 70, message: "Destination too long" }
    }

    public static checkInValidation = {
        required: { value: true, message: "Missing check in" },
        minLength: { value: 2, message: "Check In too short" },
        maxLength: { value: 20, message: "Check In too long" }
    }

    public static checkOutValidation = {
        required: { value: true, message: "Missing check out" },
        minLength: { value: 2, message: "Check Out too short" },
        maxLength: { value: 20, message: "Check Out too long" }
    }
    public static priceValidation = {
        required: { value: true, message: "Missing price" },
        min: { value: 100, message: "Price too short" },
        max: { value: 10000, message: "Price too long" }
    }

    public static imageValidation = {
        required: { value: true, message: "Missing image" }
    }

}

export default VacationModel;