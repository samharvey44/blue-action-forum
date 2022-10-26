import { Paper, Box } from '@mui/material';
import React from 'react';

import useHandleInertiaMessages from 'app/hooks/request/handleInertiaMessages';
import { useStyles } from './hooks/useStyles';

const UnauthedContainer: React.FC = ({ children }) => {
    useHandleInertiaMessages();

    const styles = useStyles();

    return (
        <Box sx={styles.centerContainer}>
            <Paper sx={styles.paper}>{children}</Paper>
        </Box>
    );
};

export default UnauthedContainer;
