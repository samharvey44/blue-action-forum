import { Add } from '@mui/icons-material';
import { useFormik } from 'formik';
import React from 'react';
import {
    Grid,
    Grow,
    Paper,
    Avatar,
    Typography,
    Box,
    TextField,
    Button,
} from '@mui/material';

import { formInitialValues } from './form/initialValues';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const Signup: React.FC = () => {
    const styles = useStyles();

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Grow in>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={3}
                sx={styles.rootGrid}
            >
                <Grid item xs={12}>
                    <Paper sx={styles.signupPaper}>
                        <Avatar
                            src="/images/collective-rounded.jpg"
                            sx={styles.appLogo}
                        />

                        <Typography variant="h3">Sign up</Typography>

                        <Typography
                            variant="subtitle1"
                            sx={styles.collectiveSubtitle}
                        >
                            <b>{"Sign up to The Collective's free forum."}</b>
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={styles.collectiveSubtitle2}
                        >
                            Get involved with discussions about displays, new
                            chants, and other topics surrounding ITFC.
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
                                error={
                                    form.touched.email && !!form.errors.email
                                }
                                helperText={
                                    form.touched.email && form.errors.email
                                }
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

                            <Box sx={styles.loginContainer}>
                                <Typography
                                    variant="subtitle1"
                                    sx={styles.loginText}
                                >
                                    {'Already have an account?'}
                                </Typography>

                                <Typography
                                    sx={styles.loginTextLink}
                                    onClick={() => {
                                        window.location.href =
                                            window.location.origin + '/login';
                                    }}
                                >
                                    &nbsp;Sign in here!
                                </Typography>
                            </Box>

                            <Box sx={styles.signupButtonContainer}>
                                <Button
                                    startIcon={<Add />}
                                    sx={styles.signupButton}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    size="large"
                                >
                                    Signup
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Grow>
    );
};

export default Signup;
