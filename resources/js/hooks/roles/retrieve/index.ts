import { useRecoilState, useSetRecoilState } from 'recoil';
import { useCallback } from 'react';

import useHandleRequestErrors from 'app/hooks/request/handleErrors';
import { roleSchema } from 'app/atoms/entities/schemas';
import { TEntityTypes } from 'app/atoms/entities/types';
import { IEntity } from 'app/atoms/entities/interfaces';
import entitiesAtom from 'app/atoms/entities';
import rolesAtom from 'app/atoms/roles';
import { normalize } from 'normalizr';
import api from 'app/services/api';

export default function useRetrieveRoles() {
    const [{ sentInitial }, setRoles] = useRecoilState(rolesAtom);
    const handleRequestErrors = useHandleRequestErrors();
    const setEntities = useSetRecoilState(entitiesAtom);

    return useCallback(
        (cb: (success: boolean) => void = () => null) => {
            if (sentInitial) return;

            api.get('/roles')
                .then(({ data: { data } }) => {
                    const normalized = normalize(data, [roleSchema]);

                    setRoles({
                        data: normalized.result,
                        sentInitial: true,
                    });

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
                .catch((e) => {
                    handleRequestErrors(e, 'Oops, an error occured!');

                    cb(false);
                });
        },
        [handleRequestErrors, sentInitial, setEntities, setRoles],
    );
}
