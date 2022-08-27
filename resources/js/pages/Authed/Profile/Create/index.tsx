import React, { useMemo, useRef, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Add } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import {
    Typography,
    TextField,
    Avatar,
    Button,
    Paper,
    Grid,
    Box,
} from '@mui/material';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import { formInitialValues } from './form/initialValues';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const CreateProfile: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();

    const fileUploadRef = useRef<HTMLInputElement | null>(null);
    const styles = useStyles();

    const [uploadedProfilePicture, setUploadedProfilePicture] =
        useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            setSubmitting(true);

            const { username, location, bio } = values;

            Inertia.post(
                '/create-profile',
                {
                    username,
                    location,
                    bio,
                    profilePicture: uploadedProfilePicture,
                },
                {
                    onFinish: () => {
                        setSubmitting(false);
                    },

                    onSuccess: () => {
                        enqueueSnackbar('Profile created successfully.', {
                            variant: 'success',
                        });
                    },
                },
            );
        },
    });

    const handleProfilePictureUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        if (!event.target.files) {
            setUploadedProfilePicture(null);

            return;
        }

        setUploadedProfilePicture(event.target.files[0]);

        enqueueSnackbar('Uploaded profile picture successfully.', {
            variant: 'success',
        });
    };

    const getUploadedImageSrc = useMemo(() => {
        return uploadedProfilePicture
            ? URL.createObjectURL(uploadedProfilePicture)
            : undefined;
    }, [uploadedProfilePicture]);

    return (
        <AppContainer>
            <AuthedContainer>
                <Paper sx={styles.paper}>
                    <Typography variant="h3">
                        {"Let's create your profile!"}
                    </Typography>

                    <Typography variant="subtitle1">
                        {
                            "Bear in mind you won't be able to change your username once set, so choose wisely!"
                        }
                    </Typography>

                    <form onSubmit={form.handleSubmit}>
                        <Box sx={styles.fieldsContainer}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sx={styles.gridItemCentered}>
                                    <Avatar
                                        sx={styles.profilePicturePreview}
                                        onClick={() => {
                                            fileUploadRef.current?.click();
                                        }}
                                        alt="Profile picture preview"
                                        src={getUploadedImageSrc}
                                    />

                                    <input
                                        type="file"
                                        accept="image/*"
                                        style={styles.hiddenImageUpload}
                                        ref={fileUploadRef}
                                        onChange={handleProfilePictureUpload}
                                    />

                                    <Typography
                                        variant="subtitle1"
                                        style={styles.profilePictureText}
                                        onClick={() => {
                                            uploadedProfilePicture
                                                ? setUploadedProfilePicture(
                                                      null,
                                                  )
                                                : fileUploadRef.current?.click();
                                        }}
                                    >
                                        {uploadedProfilePicture
                                            ? 'Remove uploaded picture'
                                            : 'Upload profile picture'}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12} lg={6} sx={styles.gridItem}>
                                    <TextField
                                        label="Enter your username..."
                                        sx={styles.formField}
                                        required
                                        variant="filled"
                                        name="username"
                                        value={form.values.username}
                                        onChange={form.handleChange}
                                        error={
                                            form.touched.username &&
                                            !!form.errors.username
                                        }
                                        helperText={
                                            form.touched.username &&
                                            form.errors.username
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} lg={6} sx={styles.gridItem}>
                                    <TextField
                                        label="Enter your location..."
                                        sx={styles.formField}
                                        variant="filled"
                                        name="location"
                                        value={form.values.location}
                                        onChange={form.handleChange}
                                        error={
                                            form.touched.location &&
                                            !!form.errors.location
                                        }
                                        helperText={
                                            form.touched.location &&
                                            form.errors.location
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12} sx={styles.gridItem}>
                                    <TextField
                                        label="Tell other users about you..."
                                        sx={styles.formField}
                                        variant="filled"
                                        name="bio"
                                        value={form.values.bio}
                                        onChange={form.handleChange}
                                        error={
                                            form.touched.bio &&
                                            !!form.errors.bio
                                        }
                                        helperText={
                                            form.touched.bio && form.errors.bio
                                        }
                                        rows={6}
                                        multiline
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={styles.submitContainer}>
                                <Button
                                    disabled={submitting}
                                    startIcon={<Add />}
                                    variant="contained"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default CreateProfile;
