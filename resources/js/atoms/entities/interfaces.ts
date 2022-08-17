import { IRole } from '../roles/interfaces';
import { IUser } from '../users/interfaces';

export interface IEntity<T> {
    [id: string]: T;
}

export interface IEntitiesAtom {
    users: IEntity<IUser>;
    roles: IEntity<IRole>;
}
