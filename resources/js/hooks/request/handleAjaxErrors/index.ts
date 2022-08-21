import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export default function useHandleAjaxErrors() {
    const { enqueueSnackbar } = useSnackbar();

    return useCallback(
        (error: any, fallbackError: string, ...acceptedErrors: string[]) => {
            let useFallback = false;

            if (!('response' in error)) useFallback = true;
            if (!('data' in error.response)) useFallback = true;
            if (!('errors' in error.response.data)) useFallback = true;

            const displayed = useFallback
                ? false
                : acceptedErrors.some((e) => {
                      if (!(e in error.response.data.errors)) return false;

                      const potentialErrors = error.response.data.errors[e];

                      if (
                          Array.isArray(potentialErrors) &&
                          potentialErrors.length <= 0
                      ) {
                          return false;
                      }

                      const errorMessage = Array.isArray(potentialErrors)
                          ? potentialErrors[0]
                          : potentialErrors;

                      enqueueSnackbar(errorMessage, {
                          variant: 'error',
                      });

                      return true;
                  });

            if (!displayed) {
                enqueueSnackbar(fallbackError, { variant: 'error' });
            }
        },
        [enqueueSnackbar],
    );
}
