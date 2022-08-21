import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import { Link } from '@inertiajs/inertia-react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import React from 'react';

import UnauthedContainer from '../components/UnauthedContainer';
import { formInitialValues } from './form/initialValues';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const Login: React.FC = () => {
    const styles = useStyles();

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <UnauthedContainer>
            <Avatar
                src="/images/collective-rounded.jpg"
                sx={styles.appLogo}
                alt="The Collective logo"
            />

            <Typography variant="h3">The Collective</Typography>

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

                <Box sx={styles.signupContainer}>
                    <Typography variant="subtitle1" sx={styles.signupText}>
                        {"Don't have an account?"}
                    </Typography>

                    <Link href="/signup" style={styles.signupTextLinkExt}>
                        <Typography sx={styles.signupTextLink}>
                            &nbsp;Sign up here!
                        </Typography>
                    </Link>
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
            </form>
        </UnauthedContainer>
    );
};

export default Login;
