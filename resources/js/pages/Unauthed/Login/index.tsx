import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import { Link } from '@inertiajs/inertia-react';
import Checkbox from '@mui/material/Checkbox';
import { Inertia } from '@inertiajs/inertia';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import React from 'react';

import UnauthedContainer from '../components/UnauthedContainer';
import { formInitialValues } from './form/initialValues';
import { linkedInLink } from 'app/globals/config';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const Login: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            const { email, password, rememberMe } = values;

            Inertia.post(
                '/login',
                {
                    email,
                    password,
                    rememberMe,
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Logged in successfully.', {
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

            <Typography variant="h3">Collective 6</Typography>

            <Typography variant="subtitle2">
                Bespoke forum created by{' '}
                <a
                    style={styles.linkedinLink}
                    rel="noopener noreferrer"
                    href={linkedInLink}
                    target="_blank"
                >
                    Sam Harvey
                </a>
            </Typography>

            <form onSubmit={form.handleSubmit} style={styles.form}>
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
                    label="Enter your password..."
                    name="password"
                    type="password"
                    value={form.values.password}
                    onChange={form.handleChange}
                    error={form.touched.password && !!form.errors.password}
                    helperText={form.touched.password && form.errors.password}
                />

                <Box sx={styles.rememberMeContainer}>
                    <FormControlLabel
                        sx={styles.rememberMeCheckbox}
                        control={
                            <Checkbox
                                checked={form.values.rememberMe}
                                onChange={(e) => {
                                    form.setFieldValue(
                                        'rememberMe',
                                        e.target.checked,
                                    );
                                }}
                            />
                        }
                        label="Remember Me"
                    />
                </Box>

                <Box sx={styles.loginButtonContainer}>
                    <Button
                        startIcon={<LoginIcon />}
                        sx={styles.loginButton}
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        Login
                    </Button>
                </Box>

                <Box sx={styles.forgotPasswordContainer}>
                    <Link href="/password-reset" style={styles.textLinkExt}>
                        <Typography
                            variant="subtitle1"
                            sx={styles.forgotPasswordText}
                        >
                            Forgotten your password?
                        </Typography>
                    </Link>
                </Box>
            </form>
        </UnauthedContainer>
    );
};

export default Login;
