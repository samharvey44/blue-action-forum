import { KeyboardReturn } from '@mui/icons-material';
import { Link } from '@inertiajs/inertia-react';
import { Box, Button } from '@mui/material';
import React from 'react';

import useHandleLogoutSuspended from 'app/hooks/request/handleLogoutSuspended';
import useHandleInertiaMessages from 'app/hooks/request/handleInertiaMessages';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const AuthedContainer: React.FC<IProps> = ({
    withBackButton,
    customReturnLink,
    children,
}) => {
    useHandleLogoutSuspended();
    useHandleInertiaMessages();

    const styles = useStyles();

    return (
        <Box sx={styles.outerCenterContainer}>
            <Box sx={styles.centerContainer}>
                {withBackButton && (
                    <Box sx={styles.backButtonContainer}>
                        {customReturnLink ? (
                            // If we have a custom return link, we'll redirect to that
                            // rather than to the last browser history entry.
                            <Link
                                href={customReturnLink}
                                style={styles.customLink}
                            >
                                <Button
                                    startIcon={<KeyboardReturn />}
                                    variant="contained"
                                    color="primary"
                                >
                                    Return
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                startIcon={<KeyboardReturn />}
                                disabled={!history.length}
                                onClick={() => {
                                    history.back();
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Return
                            </Button>
                        )}
                    </Box>
                )}

                {children}
            </Box>
        </Box>
    );
};

export default AuthedContainer;
