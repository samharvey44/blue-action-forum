import { Box, Paper, Typography } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react';
import React, { Fragment, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import { useStyles } from './hooks/useStyles';

const NeedsVerification: React.FC = () => {
    const [linkResent, setLinkResent] = useState(false);

    const {
        props: { email },
    } = usePage();

    const styles = useStyles();

    const resendEmailVerification = () => {
        Inertia.post('/email-verification', undefined, {
            onSuccess: () => {
                setLinkResent(true);
            },
        });
    };

    return (
        <AppContainer>
            <AuthedContainer>
                <Paper sx={styles.verifyPaper}>
                    <Typography variant="h3" style={styles.verifyTitle}>
                        {"You're almost there."}
                    </Typography>

                    <Typography variant="subtitle1">
                        <Fragment>
                            {`We've sent a verification email to ${email}. You'll find a link in the email, which will activate your account and allow you to access Collective 6.`}
                        </Fragment>
                    </Typography>

                    {linkResent ? (
                        <Box sx={styles.resendEmailContainer}>
                            <Typography
                                variant="subtitle1"
                                sx={styles.smallText}
                            >
                                <b>
                                    Your verification link has been successfully
                                    resent. Please check your email.
                                </b>
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={styles.resendEmailContainer}>
                            <Typography
                                variant="subtitle1"
                                sx={styles.smallText}
                            >
                                {"Not sure you've got the email? No worries."}
                            </Typography>

                            <Typography
                                onClick={resendEmailVerification}
                                sx={styles.resendEmailText}
                                variant="subtitle1"
                            >
                                &nbsp;{'Click here to send another!'}
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default NeedsVerification;
