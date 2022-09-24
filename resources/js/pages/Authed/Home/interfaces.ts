import { EFilter } from './enums';

export interface IRememberedProps {
    page: number;
    filter: EFilter;
    search: string;
}
