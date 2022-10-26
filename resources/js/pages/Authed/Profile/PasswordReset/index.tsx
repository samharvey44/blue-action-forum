import {
    Avatar,
    Box,
    Button,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { LockReset } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useFormik } from 'formik';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import { formInitialValues } from './form/initialValues';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const AuthedPasswordReset: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    const [resetting, setResetting] = useState(false);

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            setResetting(true);

            const { password, passwordConfirmation } = values;

            Inertia.put(
                '/profiles/password-reset',
                {
                    password,
                    password_confirmation: passwordConfirmation,
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Password was reset successfully.', {
                            variant: 'success',
                        });

                        resetForm();
                    },
                    onFinish: () => {
                        setResetting(false);
                    },
                },
            );
        },
    });

    return (
        <AppContainer>
            <AuthedContainer withBackButton>
                <Paper sx={styles.paper}>
                    <Box sx={styles.appLogoContainer}>
                        <Avatar
                            src="/images/collective-rounded.jpg"
                            sx={styles.appLogo}
                            alt="Collective 6 logo"
                        />
                    </Box>

                    <Typography variant="h3">Reset Password</Typography>

                    <Box sx={styles.formContainer}>
                        <form onSubmit={form.handleSubmit} style={styles.form}>
                            <TextField
                                sx={styles.passwordField}
                                required
                                variant="filled"
                                label="Enter new password..."
                                name="password"
                                type="password"
                                value={form.values.password}
                                onChange={form.handleChange}
                                error={
                                    form.touched.password &&
                                    !!form.errors.password
                                }
                                helperText={
                                    form.touched.password &&
                                    form.errors.password
                                }
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

                            <Box sx={styles.resetButtonContainer}>
                                <Button
                                    startIcon={<LockReset />}
                                    sx={styles.sendButton}
                                    disabled={resetting}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    size="large"
                                >
                                    Reset
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default AuthedPasswordReset;
