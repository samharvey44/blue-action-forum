import { IPaginatedThreads } from 'app/interfaces';
import { EFilter } from '../../enums';

export interface IProps {
    threads: IPaginatedThreads | null;
    handleGetThreads: (page: number, filter: EFilter, search?: string) => void;
    filter: EFilter;
    search: string;
}
