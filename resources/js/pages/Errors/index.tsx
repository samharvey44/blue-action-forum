import { Avatar, Box, Button, Typography } from '@mui/material';
import { KeyboardReturn } from '@mui/icons-material';
import { usePage } from '@inertiajs/inertia-react';
import React from 'react';

import { IInertiaProps } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const Errors: React.FC = () => {
    const {
        props: { status },
    } = usePage<IInertiaProps & IProps>();

    const styles = useStyles();

    const errorMessage =
        {
            500: 'Internal Server Error',
            422: 'Unprocessable Entity',
            503: 'Service Unavailable',
            419: 'Page Not Found',
            403: 'Unauthorised',
            404: 'Not Found',
        }[status] ?? '';

    const errorText =
        {
            500: "Basically, something is broken. If you're seeing this, please contact us at collective6@outlook.com - we'll get it fixed.",
            503: 'Collective 6 is currently under maintenance. Please check back later.',
            403: "You're trying to do or access something that you're not permitted to.",
            404: "We couldn't find the page or resource you were looking for.",
            422: "Something you're trying to do isn't quite right.",
            419: 'Sorry, the page expired - try that again.',
        }[status] ?? '';

    return (
        <Box sx={styles.errorContainer}>
            <Avatar
                src="/images/collective-rounded.jpg"
                sx={styles.appLogo}
                alt="Collective 6 logo"
            />
            <Typography variant="h3">
                {`Error ${status.toString()} ${
                    errorMessage ? `| ${errorMessage}` : ''
                }`}
            </Typography>

            {errorText && (
                <Typography variant="subtitle1">{errorText}</Typography>
            )}

            <Button
                style={styles.returnButton}
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
        </Box>
    );
};

export default Errors;
