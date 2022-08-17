import React, { useEffect, useState } from 'react';

import useRetrieveRoles from 'app/hooks/roles/retrieve';
import useGetUser from 'app/hooks/user/get';
import rolesAtom from 'app/atoms/roles';
import { useRecoilValue } from 'recoil';
import { IProps } from './interfaces';

const LoadRolesGate: React.FC<IProps> = ({ children }) => {
    const { sentInitial } = useRecoilValue(rolesAtom);
    const [ready, setReady] = useState(false);
    const retrieveRoles = useRetrieveRoles();
    const user = useGetUser();

    useEffect(() => {
        setReady(!user || sentInitial);

        if (!user || sentInitial) return;

        setReady(false);

        retrieveRoles(() => {
            setReady(true);
        });
    }, [user, sentInitial]);

    return children(ready);
};

export default LoadRolesGate;
