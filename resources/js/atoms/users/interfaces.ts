import { IRole } from '../roles/interfaces';

export interface IUser {
    id: number;
    name: string;
    email: string;
    role: IRole;
}
