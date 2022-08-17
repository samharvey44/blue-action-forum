import React, { useState } from 'react';

import useLoginUser from 'app/hooks/user/login';
import { useSnackbar } from 'notistack';
import { IProps } from './interfaces';
import api from 'app/services/api';

const AuthGate: React.FC<IProps> = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const login = useLoginUser();

    const [ready, setReady] = useState(false);

    api.get('/sanctum/csrf-cookie')
        .then(() => {
            login(() => {
                setReady(true);
            });
        })
        .catch(() => {
            enqueueSnackbar('Something went wrong!', {
                variant: 'error',
            });
        });

    return children(ready);
};

export default AuthGate;
