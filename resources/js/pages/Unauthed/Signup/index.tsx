import { Typography, TextField, Button, Avatar, Box } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import { Add } from '@mui/icons-material';
import React, { useState } from 'react';
import { useFormik } from 'formik';

import UnauthedContainer from '../components/UnauthedContainer';
import { formInitialValues } from './form/initialValues';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const Signup: React.FC = () => {
    const styles = useStyles();

    const [submitting, setSubmitting] = useState(false);

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            setSubmitting(true);

            const { email, password, passwordConfirmation } = values;

            Inertia.post(
                // We'll post to the current location href, since we need
                // to retain the signature and token in the URL.
                window.location.href,
                {
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                },
                {
                    onFinish: () => {
                        setSubmitting(false);
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

            <Typography variant="h3">Sign Up</Typography>

            <Typography variant="subtitle1" sx={styles.collectiveSubtitle}>
                <b>{'Sign up to the free Collective 6 forum.'}</b>
            </Typography>

            <Typography variant="subtitle1" sx={styles.collectiveSubtitle2}>
                Get involved with discussions about displays, new chants, and
                other topics surrounding ITFC.
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

                <TextField
                    sx={styles.passwordField}
                    required
                    variant="filled"
                    label="Confirm your password..."
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

                <Box sx={styles.flexContainer}>
                    <Typography variant="subtitle1" sx={styles.marginLeftText}>
                        {'Already have an account?'}
                    </Typography>

                    <Link href="/login" style={styles.linkTextExt}>
                        <Typography sx={styles.linkText}>
                            &nbsp;{'Sign in here!'}
                        </Typography>
                    </Link>
                </Box>

                <Box sx={styles.signupButtonContainer}>
                    <Button
                        sx={styles.signupButton}
                        disabled={submitting}
                        startIcon={<Add />}
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        Signup
                    </Button>
                </Box>

                <Box sx={styles.flexContainer}>
                    <Typography variant="subtitle1" sx={styles.marginLeftText}>
                        By signing up, you confirm you have read and agreed to
                        our{' '}
                        <a
                            target="_blank"
                            href={`${window.location.origin}/privacy-policy.html`}
                            style={styles.privacyPolicyLink}
                            rel="noopener noreferrer"
                        >
                            Privacy Policy.
                        </a>
                    </Typography>
                </Box>
            </form>
        </UnauthedContainer>
    );
};

export default Signup;
