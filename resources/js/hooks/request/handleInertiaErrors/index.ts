import { ErrorBag, Errors, PageProps } from '@inertiajs/inertia';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';

export default function useHandleInertiaErrors(
    pageProps: PageProps & {
        errors: Errors & ErrorBag;
    },
) {
    const { enqueueSnackbar } = useSnackbar();

    return useEffect(() => {
        const errorsArr = Object.values(pageProps.errors);

        if (errorsArr.length) {
            enqueueSnackbar(errorsArr[0], {
                variant: 'error',
            });
        }
    }, [pageProps, enqueueSnackbar]);
}
