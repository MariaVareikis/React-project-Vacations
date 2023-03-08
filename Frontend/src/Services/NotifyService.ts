import swal from 'sweetalert';

class NotifyService {

    public success(message: string): void {
        swal({
            title: message,
            icon: "success"
        });
    }

    public error(err: any): void {
        const message = this.extractErrorMessage(err);
        swal({
            title: message,
            icon: "error"
        });
    }

    private extractErrorMessage(err: any): string {

        // Front: throw "some error.....";
        if (typeof err === "string") return err;

        // Back end: throws string (500 - server crash / 401 - unauthorized/ 404...)
        if (typeof err.response?.data === "string") return err.response.data;

        // If back throws string[] (400 - validation)
        if (Array.isArray(err.response?.data)) return err.response.data[0];

        // Front: throw new Error ("some error");
        if (typeof err.message === "string") return err.message;

        // Other:
        return "Some error occurred, please tru again";
    }

}

const notifyService = new NotifyService();
export default notifyService;