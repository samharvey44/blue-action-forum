import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react';
import { LockReset } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import React from 'react';

import UnauthedContainer from '../../components/UnauthedContainer';
import { formInitialValues } from './form/initialValues';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const PasswordResetReset: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();
    const {
        props: { token },
    } = usePage();

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            const { email, password, passwordConfirmation } = values;

            Inertia.post(
                '/password-reset/reset',
                {
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                    token: token as string,
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Password was reset successfully.', {
                            variant: 'success',
                        });
                    },
                },
            );
        },
    });

    return (
        <UnauthedContainer>
            <Avatar
                src="/images/collective-rounded.jpg"
                sx={styles.appLogo}
                alt="Collective 6 logo"
            />

            <Typography variant="h3">Set New Password</Typography>

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

                <TextField
                    sx={styles.passwordField}
                    required
                    variant="filled"
                    label="Enter new password..."
                    name="password"
                    type="password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    error={form.touched.password && !!form.errors.password}
                    helperText={form.touched.password && form.errors.password}
                />

                <TextField
                    sx={styles.passwordField}
                    required
                    variant="filled"
                    label="Confirm new password..."
                    name="passwordConfirmation"
                    type="password"
                    value={form.values.passwordConfirmation}
                    onChange={form.handleChange}
                    error={
                        form.touched.passwordConfirmation &&
                        !!form.errors.passwordConfirmation
                    }
                    helperText={
                        form.touched.passwordConfirmation &&
                        form.errors.passwordConfirmation
                    }
                />

                <Box sx={styles.sendButtonContainer}>
                    <Button
                        startIcon={<LockReset />}
                        sx={styles.sendButton}
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        Reset
                    </Button>
                </Box>
            </form>
        </UnauthedContainer>
    );
};

export default PasswordResetReset;
