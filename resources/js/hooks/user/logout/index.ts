import { useResetRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';

import entitiesAtom from 'app/atoms/entities';
import usersAtom from 'app/atoms/users';
import rolesAtom from 'app/atoms/roles';
import userAtom from 'app/atoms/user';
import api from 'app/services/api';

export default () => {
    const { enqueueSnackbar } = useSnackbar();

    const resetEntities = useResetRecoilState(entitiesAtom);
    const resetUsers = useResetRecoilState(usersAtom);
    const resetRoles = useResetRecoilState(rolesAtom);
    const resetUser = useResetRecoilState(userAtom);

    return () => {
        api.post('/logout')
            .then(() => {
                resetEntities();
                resetUsers();
                resetRoles();
                resetUser();

                enqueueSnackbar('Logout successful', { variant: 'success' });
            })
            .catch(() => {
                enqueueSnackbar('Failed to logout!', { variant: 'error' });
            });
    };
};
