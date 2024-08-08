import { Task } from "./task.interface";

export interface TaskResponse {
    message: string;
    status:  string;
    task:    Task;
}