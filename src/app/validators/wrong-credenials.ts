import { AbstractControl } from "@angular/forms";
import { IUser } from "../interfaces/user.interface";

export const    wrongCredentials = (users: IUser[]) => {
    return (formGroup: AbstractControl) => {
        const { email, password } = formGroup.value;
    
        const foundUser = users.find(usr => usr.email === email && usr.password === password);
    
        if (foundUser) {
            return null;
        } else {
            return { wrongCredentials: true };
        }
    }
    
}