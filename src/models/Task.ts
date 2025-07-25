 export enum Status {
    Pending = "Pending",
    InProgress = "In Progress",
    Done = "Done"
 }

 export interface Task {
    id: number;
    description: string;
    status: Status;
    createdAt: string; // ISO formatted date string
 }