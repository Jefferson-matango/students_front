export interface Subject {
    message: string;
    code:    string;
    data:    Datum[];
}

export interface Datum {
    id:   number;
    name: string;
}
