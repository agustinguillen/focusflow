export interface TaskInterface {
    id: string;
    title: string;
    description: string;
}

export interface ColumnInterface {
    id: string;
    title: string;
    tasks: TaskInterface[];
}