import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import useInitializeTheme from './hooks/initializeTheme';

const Main: React.FC = ({ children }) => {
    const theme = useInitializeTheme();

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
