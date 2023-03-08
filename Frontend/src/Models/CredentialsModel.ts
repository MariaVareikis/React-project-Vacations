class CredentialsModel {

    public username: string;
    public password: string;

    public static usernameValidation = {
        required: { value: true, message: "Missing username" },
        minLength: { value: 4, message: "Username too short" },
        maxLength: { value: 20, message: "Username too long" }
    }

    public static passwordValidation = {
        required: { value: true, message: "Missing password" },
        minLength: { value: 4, message: "Password too short" },
        maxLength: { value: 100, message: "Password too long" }
    }

}

export default CredentialsModel;