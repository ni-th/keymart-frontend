export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Login = {
    email: string;
    password: string;
};
export type Register = {
    name: string;
    email: string;
    password: string;
}
