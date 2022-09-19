import { IPaginatedComments } from 'app/interfaces';

export interface IProps {
    disableBack: boolean;
    disableForward: boolean;
    comments: IPaginatedComments;
    threadId: number;
}
