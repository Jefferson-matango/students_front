export interface RegisterResponse {
    message: string;
    status:  number;
    user:    User;
}

export interface User {
    name:       string;
    email:      string;
    updated_at: Date;
    created_at: Date;
    id:         number;
}
