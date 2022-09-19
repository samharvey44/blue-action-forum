import { IPaginatedComments, IReaction } from 'app/interfaces';

export interface IProps {
    threadId: number;
    comments: IPaginatedComments;
    reactions: IReaction[];
}
