import { usePage } from '@inertiajs/inertia-react';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export default function useHandleInertiaMessages() {
    const {
        props: { errors, successMessage, errorMessage },
    } = usePage();
    const { enqueueSnackbar } = useSnackbar();

    return useEffect(() => {
        const errorsArr = Object.values(errors);

        // The error could be a custom error message, or from
        // the errors object given to Inertia by default.
        const hasError = errorsArr.length || errorMessage;

        if (hasError) {
            enqueueSnackbar(errorsArr[0] ?? (errorMessage as string), {
                variant: 'error',
            });

            return;
        }

        if (successMessage) {
            enqueueSnackbar(successMessage as string, {
                variant: 'success',
            });

            return;
        }
    }, [errors, successMessage, errorMessage, enqueueSnackbar]);
}
