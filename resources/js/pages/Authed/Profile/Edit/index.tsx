import React, { useEffect, useRef, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Edit } from '@mui/icons-material';
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
import useGetAuthedUser from 'app/hooks/getAuthedUser';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const EditProfile: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();

    const fileUploadRef = useRef<HTMLInputElement | null>(null);
    const [initialLoad, setInitialLoad] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const styles = useStyles();

    const authedUser = useGetAuthedUser();

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            setSubmitting(true);

            const { location, bio } = values;

            Inertia.patch(
                '/profiles/edit',
                {
                    location,
                    bio,
                },
                {
                    onFinish: () => {
                        setSubmitting(false);
                    },

                    onSuccess: () => {
                        enqueueSnackbar('Profile updated successfully.', {
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
        const files = event.target.files;

        if (!files || !files.length) {
            return;
        }

        Inertia.post(
            '/profiles/edit/profilePicture',
            {
                profilePicture: files[0],
                _method: 'put',
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Profile picture uploaded successfully.', {
                        variant: 'success',
                    });
                },
            },
        );
    };

    const handleProfilePictureRemove = () => {
        Inertia.post(
            '/profiles/edit/profilePicture',
            {
                profilePicture: null,
                _method: 'put',
            },
            {
                onSuccess: () => {
                    enqueueSnackbar('Profile picture removed successfully.', {
                        variant: 'success',
                    });
                },
            },
        );
    };

    useEffect(() => {
        if (!initialLoad) {
            return;
        }

        form.setValues({
            location: authedUser?.profile?.location ?? '',
            bio: authedUser?.profile?.bio ?? '',
        });

        setInitialLoad(false);
    }, [
        authedUser?.profile?.location,
        authedUser?.profile?.bio,
        initialLoad,
        form,
    ]);

    return (
        <AppContainer>
            <AuthedContainer withBackButton>
                <Paper sx={styles.paper}>
                    <Typography variant="h3">{'Edit your profile'}</Typography>

                    <Typography variant="subtitle1">
                        Your username is: <b>{authedUser?.profile?.username}</b>
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
                                        src={
                                            authedUser?.profile?.profilePicture
                                                ?.url
                                        }
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
                                            authedUser?.profile?.profilePicture
                                                ? handleProfilePictureRemove()
                                                : fileUploadRef.current?.click();
                                        }}
                                    >
                                        {authedUser?.profile?.profilePicture
                                            ? 'Remove profile picture'
                                            : 'Upload profile picture'}
                                    </Typography>
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
                                        rows={4}
                                        multiline
                                    />
                                </Grid>
                            </Grid>

                            <Box sx={styles.submitContainer}>
                                <Button
                                    disabled={submitting}
                                    startIcon={<Edit />}
                                    variant="contained"
                                    type="submit"
                                >
                                    Update
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default EditProfile;
