import { ErrorBag, Errors, Page, PageProps } from '@inertiajs/inertia';
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
    username: string;
    location: string | null;
    profilePicture: IFile | null;
    bio: string | null;
    isReported?: boolean;
    isReportedByUser: boolean;
}

export interface IRole {
    id: number;
    name: string;
}

export interface IUser {
    id: number;
    createdAt: string;
    email?: string;
    isGhost: boolean;
    profile: IProfile | null;
    role: IRole;
    lastSeen: string | null;
    isSuspended?: boolean;
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
    mostRecentComment: IComment | null;
    isUnread: boolean;
    isLocked: boolean;
    isPinned: boolean;
    userIsFollowing: boolean;
}

export interface ICategory {
    id: number;
    name: string;
    displayColor: string;
}

export interface ICommentReply {
    id: number;
    createdAt: string;
    content?: string;
    creator: IUser;
    isDeleted: boolean;
}

export interface IComment {
    id: number;
    createdAt: string;
    content?: string;
    images?: IFile[];
    creator: IUser;
    commentReactions: ICommentReaction[];
    replyingTo?: ICommentReply;
    isDeleted: boolean;
    isReported?: boolean;
    isReportedByUser: boolean;
}

export interface IReaction {
    id: number;
    name: string;
    iconPath: string;
}

export interface IPaginatedComments {
    data: IComment[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface IPaginatedThreads {
    data: IThread[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface IPaginatedUsers {
    data: IUser[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export interface ICommentReaction {
    id: number;
    user: IUser;
    reaction: IReaction;
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
