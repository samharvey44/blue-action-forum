import { createTheme } from '@mui/material';
import { useMemo } from 'react';

export default function useInitializeTheme() {
    return useMemo(
        () =>
            createTheme({
                palette: {
                    primary: {
                        main: '#00168a',
                    },
                },
                typography: {
                    fontFamily: `"Montserrat", sans-serif`,
                },
            }),
        [],
    );
}
