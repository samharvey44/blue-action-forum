import { ERoles } from 'app/atoms/roles/enums';
import { EPages } from 'app/pages/enums';
import React from 'react';

export interface IPage {
    name: EPages;
    path: string;
    roles: ERoles[];
    authed: boolean;
    Element: React.FC;
}
