import { KeyboardReturn } from '@mui/icons-material';
import { Box, Grow, Button } from '@mui/material';
import React from 'react';

import useHandleInertiaMessages from 'app/hooks/request/handleInertiaMessages';
import { useStyles } from './hooks/useStyles';

const AuthedContainer: React.FC<{ withBackButton?: boolean }> = ({
    withBackButton,
    children,
}) => {
    useHandleInertiaMessages();

    const styles = useStyles();

    return (
        <Grow in>
            <Box sx={styles.outerCenterContainer}>
                <Box sx={styles.centerContainer}>
                    {withBackButton && (
                        <Box sx={styles.backButtonContainer}>
                            <Button
                                disabled={!history.length}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    history.back();
                                }}
                                startIcon={<KeyboardReturn />}
                            >
                                Return
                            </Button>
                        </Box>
                    )}

                    {children}
                </Box>
            </Box>
        </Grow>
    );
};

export default AuthedContainer;
