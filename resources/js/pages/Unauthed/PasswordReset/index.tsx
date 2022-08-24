import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { Send } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import React from 'react';

import UnauthedContainer from '../components/UnauthedContainer';
import { formInitialValues } from './form/initialValues';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const PasswordReset: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            const { email } = values;

            Inertia.post(
                '/password-reset',
                {
                    email,
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar(
                            'If an account with this email exists, a password reset link has been sent.',
                            {
                                variant: 'success',
                            },
                        );
                    },
                },
            );

            form.resetForm();
        },
    });

    return (
        <UnauthedContainer>
            <Avatar
                src="/images/collective-rounded.jpg"
                sx={styles.appLogo}
                alt="Collective 6 logo"
            />

            <Typography variant="h3">Reset Your Password</Typography>

            <Typography variant="subtitle1">
                {
                    "We'll email you a link, with which you can reset your password."
                }
            </Typography>

            <form
                onSubmit={form.handleSubmit}
                style={{
                    width: '100%',
                }}
            >
                <TextField
                    sx={styles.emailField}
                    required
                    variant="filled"
                    label="Enter your email..."
                    name="email"
                    value={form.values.email}
                    onChange={form.handleChange}
                    error={form.touched.email && !!form.errors.email}
                    helperText={form.touched.email && form.errors.email}
                />

                <Box sx={styles.sendButtonContainer}>
                    <Button
                        sx={styles.sendButton}
                        startIcon={<Send />}
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        Send Reset Link
                    </Button>

                    <Link href="/login" style={styles.textLinkExt}>
                        <Typography sx={styles.textLink}>
                            Back to Login
                        </Typography>
                    </Link>
                </Box>
            </form>
        </UnauthedContainer>
    );
};

export default PasswordReset;
