import { IUser } from './interfaces';

/**
 * Ellipsise the given string if it is over the provided length.
 *
 * @param string The string to ellipsise.
 * @param maxLength The maximum length of the given string before it is ellipsised.
 *
 * @returns The ellipsised string.
 */
export const ellipsise = (string: string, maxLength: number): string =>
    string.length > maxLength ? `${string.slice(0, maxLength)}...` : string;

/**
 * Check whether the given user is an administrator.
 *
 * @param user The user to check.
 *
 * @returns Whether the user is an admin.
 */
export const userIsAdmin = (user: IUser | null): boolean =>
    ['Super Admin', 'Admin'].some((r) => r === user?.role.name);
