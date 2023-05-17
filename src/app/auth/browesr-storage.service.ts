import { Injectable } from "@angular/core";
import { User } from "./user.model";

export interface IUserFromStorage {
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: string;
}

@Injectable()
export class BrowserStorageService {
    
    storeUser(user: User){
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User | null{
        const userString: string | null = localStorage.getItem('user');

        if(!userString) return null;

        const { email, id, _token, _tokenExpirationDate } =  JSON.parse(userString) as IUserFromStorage;
        
        return new User(
            email, 
            id, 
            _token,
            new Date(_tokenExpirationDate)
        )
        
    }

    clearUser() {
        localStorage.removeItem('user');
    }

}