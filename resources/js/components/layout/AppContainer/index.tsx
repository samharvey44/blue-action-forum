import { Box, useTheme, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import React, { Fragment } from 'react';

import { useStyles } from './hooks/useStyles';

const AppContainer: React.FC = ({ children }) => {
    const styles = useStyles();
    const theme = useTheme();

    const isLg = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <Fragment>
            <AppBar position="static" sx={styles.appBar}>
                {!isLg && (
                    <Box
                        src="images/collective-banner.jpg"
                        sx={styles.bannerImage}
                        component="img"
                    />
                )}
            </AppBar>

            {children}
        </Fragment>
    );
};

export default AppContainer;
