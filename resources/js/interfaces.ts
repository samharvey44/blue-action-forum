import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/system/createTheme/createTheme';
import { ErrorBag, Errors, Page, PageProps } from '@inertiajs/inertia';

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
    username: string;
    location?: string;
    profilePicture: IFile | null;
}

export interface IRole {
    id: number;
    name: string;
}

export interface IUser {
    id: number;
    createdAt: string;
    email?: string;
    profile: IProfile | null;
    role: IRole;
}

export interface IPreviewableFile {
    file: File;
    key: number;
    displayUrl: string;
}

export interface IThread {
    id: number;
    createdAt: string;
    title: string;
    creator: IUser;
    categories: ICategory[];
    comments?: IComment[];
}

export interface ICategory {
    id: number;
    name: string;
    displayColor: string;
}

export interface IComment {
    id: number;
    createdAt: string;
    content: string;
    images: IFile[];
    creator: IUser;
}

export interface IInertiaProps extends Page<PageProps> {
    props: {
        errors: Errors & ErrorBag;
        auth: {
            user?: IUser;
        };
        successMessage?: string;
        laravelVersion: string;
        phpVersion: string;
    };
}
