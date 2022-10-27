import { ThemeProvider } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import useInitializeTheme from './hooks/initializeTheme';

const Main: React.FC = ({ children }) => {
    const theme = useInitializeTheme();

    window.addEventListener('popstate', (event) => {
        event.stopImmediatePropagation();

        Inertia.reload({
            preserveState: false,
            preserveScroll: false,
            replace: true,
            // @ts-expect-error https://github.com/inertiajs/inertia/issues/565
            onSuccess: (page) => Inertia.setPage(page),
            onError: () => (window.location.href = event.state.url),
        });
    });

    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SnackbarProvider>
    );
};

export default Main;
