import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/system/createTheme/createTheme';

export interface IStyles {
    [name: string]: SxProps<Theme>;
}

export interface IMeta {
    current_page: number;
    total: number;
    last_page: number;
}

export interface IFile {
    id: number;
    url: string;
}

export interface IProfile {
    id: number;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    location: string | null;
    profilePicture: IFile | null;
}

export interface IRole {
    id: number;
    name: string;
}

export interface IAuthedUser {
    id: number;
    name: string | null;
    email: string;
    profile: IProfile | null;
    role: IRole;
}
