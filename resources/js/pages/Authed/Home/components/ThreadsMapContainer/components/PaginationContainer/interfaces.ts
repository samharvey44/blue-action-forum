import React from 'react';

import { EFilter } from 'app/Pages/Authed/Home/enums';
import { IPaginatedThreads } from 'app/interfaces';

export interface IProps {
    threads: IPaginatedThreads | null;
    handleGetThreads: (page: number, filter: EFilter, search?: string) => void;
    filter: EFilter;
    search: string;
}
