import { ThemeProvider } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import useInitializeTheme from './hooks/initializeTheme';

const Main: React.FC = ({ children }) => {
    const theme = useInitializeTheme();

    let stale = false;

    // Inertia.js caches page state on previous page visits.
    // For a few areas of the application, this isn't really desired behaviour, as we could have outdated data.
    // As a result, we'll ensure we have fresh data even when navigating back through history.
    window.addEventListener('popstate', () => {
        stale = true;
    });

    Inertia.on('navigate', (event) => {
        const page = event.detail.page;

        if (stale) {
            Inertia.get(page.url, {}, { replace: true, preserveState: false });
        }

        stale = false;
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
