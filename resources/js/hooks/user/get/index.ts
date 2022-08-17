import { denormalize } from 'normalizr';
import { useRecoilValue } from 'recoil';
import { useMemo } from 'react';

import { userSchema } from 'app/atoms/entities/schemas';
import { IUser } from 'app/atoms/users/interfaces';
import entitiesAtom from 'app/atoms/entities';
import userAtom from 'app/atoms/user';

export default function useGetUser() {
    const entities = useRecoilValue(entitiesAtom);
    const user = useRecoilValue(userAtom);

    return useMemo(
        () => denormalize(user, userSchema, entities) as IUser | null,
        [entities, user],
    );
}
