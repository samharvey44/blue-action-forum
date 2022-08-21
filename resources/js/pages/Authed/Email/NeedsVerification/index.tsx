import { Box, Paper, Typography } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react';
import React, { Fragment } from 'react';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import { useStyles } from './hooks/useStyles';

const NeedsVerification: React.FC = () => {
    const {
        props: { email },
    } = usePage();

    const styles = useStyles();

    return (
        <AppContainer>
            <AuthedContainer>
                <Paper sx={styles.verifyPaper}>
                    <Typography variant="h3" style={styles.verifyTitle}>
                        {"You're almost there."}
                    </Typography>

                    <Typography variant="subtitle1">
                        <Fragment>
                            {`We've sent a verification email to ${email}. You'll find a link in the email, which will activate your account and allow you to access The Collective.`}
                        </Fragment>
                    </Typography>

                    <Box sx={styles.resendEmailContainer}>
                        <Typography variant="subtitle1" sx={styles.smallText}>
                            {"Not sure you've got the email? No worries."}
                        </Typography>

                        {/*
                            todo - verification link resend
                        */}
                        <Typography
                            variant="subtitle1"
                            sx={styles.resendEmailText}
                        >
                            &nbsp;Click here to send another!
                        </Typography>
                    </Box>
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default NeedsVerification;
