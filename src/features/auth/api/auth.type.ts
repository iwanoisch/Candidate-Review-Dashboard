import {User} from "../slice/auth.type.ts";

export interface LoginResponse {
    user: User;
    token: string;
}

export interface Token {
    token: string;
}
