import { Box, Grow } from '@mui/material';
import React from 'react';

import useHandleInertiaMessages from 'app/hooks/request/handleInertiaMessages';
import { useStyles } from './hooks/useStyles';

const AuthedContainer: React.FC = ({ children }) => {
    useHandleInertiaMessages();
    const styles = useStyles();

    return (
        <Grow in>
            <Box sx={styles.outerCenterContainer}>
                <Box sx={styles.centerContainer}>{children}</Box>
            </Box>
        </Grow>
    );
};

export default AuthedContainer;
