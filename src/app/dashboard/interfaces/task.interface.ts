export interface Task {
    name:        string;
    description?: string;
    state?:       boolean;
    subject_id:  number;
    updated_at?:  Date;
    created_at?:  Date;
    id:          number;
}
