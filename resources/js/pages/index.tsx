import { ERoles } from 'app/atoms/roles/enums';
import { EPages } from 'app/pages/enums';
import { IPage } from './interfaces';
import Login from './Unauthed/Login';
import Home from './Authed/Home';

const unauthed: IPage[] = [
    {
        name: EPages.Login,
        path: '/login',
        roles: [],
        authed: false,
        Element: Login,
    },
];

const authed: IPage[] = [
    {
        name: EPages.Home,
        path: '/home',
        roles: [ERoles.User, ERoles.Admin],
        authed: true,
        Element: Home,
    },
];

export const unauthedPages: IPage[] = unauthed;
export const authedPages: IPage[] = authed;

export const pages: IPage[] = [...unauthed, ...authed];
