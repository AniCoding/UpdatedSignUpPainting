import { AbstractControl } from "@angular/forms";
import { IUser } from "../interfaces/user.interface";

export const userExists = (users: IUser[]) => {
    return (formGroup: AbstractControl) => {
        const { email } = formGroup.value;

        const foundUser = users.find(usr => usr.email === email);
        if (foundUser) {
            return {userExists: true};
        }
        
        return null;
    }
}