import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useSnackbar } from 'notistack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import React from 'react';

import { formInitialValues } from './form/initialValues';
import useGetTimeOfDay from 'app/hooks/timeOfDay/get';
import useLoginUser from 'app/hooks/user/login';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';
import api from 'app/services/api';

const Login: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const timeOfDay = useGetTimeOfDay();
    const login = useLoginUser();
    const styles = useStyles();

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            api.post('/login', values)
                .then(() => {
                    enqueueSnackbar('Logged in successfully!', {
                        variant: 'success',
                    });

                    login();
                })
                .catch(() => {
                    enqueueSnackbar('Login failed!', {
                        variant: 'error',
                    });
                });
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
                    <Paper sx={styles.loginPaper}>
                        <Avatar
                            src="https://picsum.photos/150"
                            sx={styles.appLogo}
                        />

                        <Typography variant="h4">Good {timeOfDay}!</Typography>

                        <form onSubmit={form.handleSubmit}>
                            <TextField
                                sx={styles.emailField}
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

                            <Box sx={styles.loginButtonContainer}>
                                <Button
                                    startIcon={<LoginIcon />}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Grow>
    );
};

export default Login;
