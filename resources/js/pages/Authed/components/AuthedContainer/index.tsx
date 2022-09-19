import { KeyboardReturn } from '@mui/icons-material';
import { Box, Grow, Button } from '@mui/material';
import React from 'react';

import useHandleInertiaMessages from 'app/hooks/request/handleInertiaMessages';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';
import { Link } from '@inertiajs/inertia-react';

const AuthedContainer: React.FC<IProps> = ({
    withBackButton,
    customReturnLink,
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
        </Grow>
    );
};

export default AuthedContainer;
