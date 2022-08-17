import ReactDOM from 'react-dom';
import React from 'react';

import Main from './main';

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
