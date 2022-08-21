import { usePage } from '@inertiajs/inertia-react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export default function useHandleInertiaMessages() {
    const {
        props: { errors, successMessage },
    } = usePage();
    const { enqueueSnackbar } = useSnackbar();

    return useEffect(() => {
        const errorsArr = Object.values(errors);

        if (errorsArr.length) {
            enqueueSnackbar(errorsArr[0], {
                variant: 'error',
            });

            return;
        }

        if (successMessage && typeof successMessage === 'string') {
            enqueueSnackbar(successMessage, {
                variant: 'success',
            });

            return;
        }
    }, [errors, successMessage, enqueueSnackbar]);
}
