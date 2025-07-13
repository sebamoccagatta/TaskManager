export type Task = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
}

export type FilterType = { id: string; value: string | boolean };