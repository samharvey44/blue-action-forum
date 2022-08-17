import { useSetRecoilState } from 'recoil';
import { normalize } from 'normalizr';
import { useCallback } from 'react';

import { userSchema } from 'app/atoms/entities/schemas';
import { TEntityTypes } from 'app/atoms/entities/types';
import { IEntity } from 'app/atoms/entities/interfaces';
import entitiesAtom from 'app/atoms/entities';
import usersAtom from 'app/atoms/users';
import userAtom from 'app/atoms/user';
import api from 'app/services/api';

export default () => {
    const setEntities = useSetRecoilState(entitiesAtom);
    const setUsers = useSetRecoilState(usersAtom);
    const setUser = useSetRecoilState(userAtom);

    return useCallback(
        (cb: (success: boolean) => void = () => null) => {
            api.get('/me')
                .then(({ data: { data } }) => {
                    const normalized = normalize(data, userSchema);

                    setUsers({
                        data: normalized.result,
                        sentInitial: true,
                    });

                    setUser(normalized.result);

                    setEntities((currentEntities) => {
                        const nextEntities = { ...currentEntities };

                        Object.entries(normalized.entities).forEach(
                            ([key, values]) => {
                                nextEntities[key as TEntityTypes] = {
                                    ...nextEntities[key as TEntityTypes],
                                    ...(values as IEntity<any>),
                                };
                            },
                        );

                        return nextEntities;
                    });

                    cb(true);
                })
                .catch(() => {
                    cb(false);
                });
        },
        [setEntities, setUsers, setUser],
    );
};
