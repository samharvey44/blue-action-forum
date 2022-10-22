import React, { SetStateAction } from 'react';

import { IComment } from 'app/interfaces';

export interface IProps {
    threadId: number;
    replyingTo: IComment | null;
    setReplyingTo: React.Dispatch<SetStateAction<number | null>>;
    containerRef: React.MutableRefObject<HTMLDivElement | null>;
}
