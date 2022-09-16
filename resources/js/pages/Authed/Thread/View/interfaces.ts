import { IThread, IReaction, IPaginatedComments } from 'app/interfaces';

export interface IProps {
    props: {
        thread: IThread;
        reactions: IReaction[];
        comments: IPaginatedComments;
    };
}
