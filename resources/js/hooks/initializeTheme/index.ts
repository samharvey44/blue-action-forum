import { createTheme } from '@mui/material';
import { useMemo } from 'react';

import { PRIMARY } from 'app/globals/colors';

export default function useInitializeTheme() {
    return useMemo(
        () =>
            createTheme({
                palette: {
                    primary: {
                        main: PRIMARY,
                    },
                },
                typography: {
                    fontFamily: `"Montserrat", sans-serif`,
                },
            }),
        [],
    );
}
