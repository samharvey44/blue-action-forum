import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { createInertiaApp } from '@inertiajs/inertia-react';
import useInitializeTheme from './hooks/initializeTheme';
import { InertiaProgress } from '@inertiajs/progress';
import { SnackbarProvider } from 'notistack';
import { render } from 'react-dom';
import React from 'react';

const Main = (): null => {
    const theme = useInitializeTheme();

    InertiaProgress.init();

    createInertiaApp({
        resolve: (name) => require(`./Pages/${name}`),
        setup({ el, App, props }) {
            render(
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <ThemeProvider theme={theme}>
                        <App {...props} />
                    </ThemeProvider>
                </SnackbarProvider>,
                el,
            );
        },
    });

    return null;
};

export default Main;
