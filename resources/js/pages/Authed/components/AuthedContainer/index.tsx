import { Box, Grow } from '@mui/material';
import React from 'react';

import { useStyles } from './hooks/useStyles';

const AuthedContainer: React.FC = ({ children }) => {
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
