import { usePage } from '@inertiajs/inertia-react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

import { IInertiaProps } from 'app/interfaces';

export default function useHandleInertiaMessages() {
    const { enqueueSnackbar } = useSnackbar();
    const {
        props: { errors, successMessage },
    } = usePage<IInertiaProps>();

    useEffect(() => {
        const errorsArr = Object.values(errors);

        if (errorsArr.length) {
            enqueueSnackbar(errorsArr[0], {
                variant: 'error',
            });

            return;
        }

        if (successMessage) {
            enqueueSnackbar(successMessage as string, {
                variant: 'success',
            });
        }
    }, [errors, successMessage, enqueueSnackbar]);
}
