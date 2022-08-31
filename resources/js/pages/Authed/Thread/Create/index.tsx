import { Grid, Paper, TextField, Typography } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import React from 'react';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import { formInitialValues } from './form/initialValues';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const CreateThread: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            const { title } = values;

            Inertia.post(
                '/threads/create',
                {
                    title,
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Thread created successfully.', {
                            variant: 'success',
                        });
                    },
                },
            );
        },
    });

    return (
        <AppContainer>
            <AuthedContainer>
                <Paper sx={styles.createPaper}>
                    <Typography variant="h3">Create a New Thread</Typography>

                    <Typography variant="subtitle1">
                        Start a new conversation within Collective 6.
                    </Typography>

                    <Grid container spacing={3} sx={styles.createGrid}>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <TextField
                                        sx={styles.field}
                                        required
                                        variant="filled"
                                        label="Enter a title..."
                                        name="title"
                                        type="title"
                                        value={form.values.title}
                                        onChange={form.handleChange}
                                        error={
                                            form.touched.title &&
                                            !!form.errors.title
                                        }
                                        helperText={
                                            form.touched.title &&
                                            form.errors.title
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Start off the conversation..."
                                sx={styles.field}
                                variant="filled"
                                name="content"
                                value={form.values.content}
                                onChange={form.handleChange}
                                error={
                                    form.touched.content &&
                                    !!form.errors.content
                                }
                                helperText={
                                    form.touched.content && form.errors.content
                                }
                                rows={8}
                                multiline
                                required
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default CreateThread;
