import { User } from "./user.interface";

export interface LoginResponse {
    message: string;
    status:  number;
    data:    Data;
}


export interface Data {
    access_token: string;
    token_type:   string;
    expires_in:   number;
    user:         User;
}

