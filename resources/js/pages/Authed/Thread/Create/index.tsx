import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Add, Clear, FileUpload } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { Box } from '@mui/system';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import { formInitialValues } from './form/initialValues';
import { IPreviewableFile } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';

const CreateThread: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();

    const fileUploadRef = useRef<HTMLInputElement | null>(null);
    const styles = useStyles();

    const [uploadedFiles, setUploadedFiles] = useState<IPreviewableFile[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            setSubmitting(true);

            const { title, content } = values;

            Inertia.post(
                '/threads/create',
                {
                    title,
                    content,
                    images: uploadedFiles.map(
                        (uploadedFile) => uploadedFile.file,
                    ),
                },
                {
                    onSuccess: () => {
                        enqueueSnackbar('Thread created successfully.', {
                            variant: 'success',
                        });
                    },
                    onFinish: () => {
                        setSubmitting(false);
                    },
                },
            );
        },
    });

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files) {
            setUploadedFiles([]);

            return;
        }

        const filesArr = Object.values(files);

        if (length > 5 || [...uploadedFiles, ...filesArr].length > 5) {
            return enqueueSnackbar(
                'You may only upload a maximum of 5 images per comment.',
                {
                    variant: 'error',
                },
            );
        }

        setUploadedFiles((currFiles) => [
            ...currFiles,
            ...filesArr.map((file) => {
                return {
                    file: file,
                    key: Math.random(),
                    displayUrl: URL.createObjectURL(file),
                };
            }),
        ]);

        enqueueSnackbar('Uploaded file(s) successfully.', {
            variant: 'success',
        });
    };

    const handleFileRemove = (key: number) => {
        setUploadedFiles((currFiles) =>
            currFiles.filter((file) => file.key !== key),
        );

        enqueueSnackbar('Removed file successfully.', {
            variant: 'success',
        });
    };

    return (
        <AppContainer>
            <AuthedContainer>
                <form onSubmit={form.handleSubmit}>
                    <Paper sx={styles.createPaper}>
                        <Typography variant="h3">
                            Create a New Thread
                        </Typography>

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
                                        form.touched.content &&
                                        form.errors.content
                                    }
                                    rows={8}
                                    multiline
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={styles.categoriesContainer}>
                                    {/* todo */}
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={styles.endAlignContainer}>
                                    {uploadedFiles.map(
                                        ({ displayUrl, key }, index, self) => (
                                            <Box
                                                key={key}
                                                sx={
                                                    index === self.length - 1
                                                        ? styles.uploadedImageContainerEnd
                                                        : styles.uploadedImageContainer
                                                }
                                            >
                                                <Box
                                                    component="img"
                                                    sx={styles.uploadedFile}
                                                    src={displayUrl}
                                                    alt="Uploaded file"
                                                />

                                                <Box
                                                    sx={styles.badge}
                                                    onClick={() => {
                                                        handleFileRemove(key);
                                                    }}
                                                >
                                                    <Clear
                                                        sx={styles.deleteIcon}
                                                    />
                                                </Box>
                                            </Box>
                                        ),
                                    )}
                                </Box>

                                <Box sx={styles.imageUploadsInfoContainer}>
                                    <Typography variant="subtitle1">
                                        {`${uploadedFiles.length} file(s) uploaded.`}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={styles.endAlignContainer}>
                                    <Button
                                        disabled={uploadedFiles.length === 5}
                                        onClick={() => {
                                            fileUploadRef.current?.click();
                                        }}
                                        startIcon={<FileUpload />}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Upload Images
                                    </Button>

                                    <Button
                                        sx={styles.createButton}
                                        disabled={submitting}
                                        startIcon={<Add />}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Create
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>

                <input
                    style={styles.hiddenImageUpload}
                    onChange={handleFileUpload}
                    ref={fileUploadRef}
                    accept="image/*"
                    type="file"
                    multiple
                />
            </AuthedContainer>
        </AppContainer>
    );
};

export default CreateThread;
