import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { SnackbarProvider } from 'notistack';
import { RecoilRoot } from 'recoil';
import Echo from 'laravel-echo';
import React from 'react';

import useInitializeTheme from './hooks/initializeTheme';
import MainGate from './components/gates/MainGate';
import Router from './router';

const Main: React.FC = () => {
    const theme = useInitializeTheme();

    window.Pusher = require('pusher-js');

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        wsHost: window.location.hostname,
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
    });

    return (
        <RecoilRoot>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <ThemeProvider theme={theme}>
                    <MainGate>
                        {(ready) => (ready ? <Router /> : null)}
                    </MainGate>
                </ThemeProvider>
            </SnackbarProvider>
        </RecoilRoot>
    );
};

export default Main;
