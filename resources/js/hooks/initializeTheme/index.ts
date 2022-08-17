import { createTheme } from '@mui/material';
import { useMemo } from 'react';

export default function useInitializeTheme() {
    return useMemo(
        () =>
            createTheme({
                palette: {
                    primary: {
                        main: '#E54B4B',
                    },
                    secondary: {
                        main: '#FFA987',
                    },
                },
                typography: {
                    fontFamily: `"Montserrat", sans-serif`,
                },
            }),
        [],
    );
}
