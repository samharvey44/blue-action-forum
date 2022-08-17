import { schema } from 'normalizr';

export const roleSchema = new schema.Entity('roles');

export const userSchema = new schema.Entity('users', {
    role: roleSchema,
});
