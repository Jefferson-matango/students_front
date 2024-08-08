export interface TaskRequest {
    name:        string;
    description?: string;
    state:       boolean; // Asegúrate de que sea booleano para el request
    subject_id:  number;
}
