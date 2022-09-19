import { Add, Circle, Clear, FileUpload } from '@mui/icons-material';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { Box } from '@mui/system';
import {
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
    Chip,
} from '@mui/material';

import { IInertiaProps, IPreviewableFile } from 'app/interfaces';
import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import { formInitialValues } from './form/initialValues';
import { usePage } from '@inertiajs/inertia-react';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';
import { IProps } from './interfaces';

const CreateThread: React.FC = () => {
    const { categories } = usePage<IInertiaProps & IProps>().props;
    const { enqueueSnackbar } = useSnackbar();

    const fileUploadRef = useRef<HTMLInputElement | null>(null);
    const styles = useStyles();

    const [uploadedFiles, setUploadedFiles] = useState<IPreviewableFile[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
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
                    categories: selectedCategories,
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

    const handleFileRemove = useCallback(
        (key: number) => {
            setUploadedFiles((currFiles) =>
                currFiles.filter((file) => file.key !== key),
            );

            enqueueSnackbar('Removed file successfully.', {
                variant: 'success',
            });
        },
        [enqueueSnackbar],
    );

    const mappedCategories = useMemo(() => {
        return categories.map(({ id, name, displayColor }) => (
            <Chip
                icon={
                    <Circle
                        sx={{
                            color: `${displayColor} !important`,
                        }}
                    />
                }
                onClick={() => {
                    setSelectedCategories((selected) => {
                        return selected.find((c) => c === id)
                            ? selected.filter((c) => c !== id)
                            : [...selected, id];
                    });
                }}
                variant={
                    selectedCategories.find((c) => c === id)
                        ? 'filled'
                        : 'outlined'
                }
                sx={styles.category}
                label={name}
                key={id}
            />
        ));
    }, [categories, selectedCategories, styles.category]);

    const mappedFiles = useMemo(() => {
        return uploadedFiles.map(({ displayUrl, key }, index, self) => (
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
                    <Clear sx={styles.deleteIcon} />
                </Box>
            </Box>
        ));
    }, [
        handleFileRemove,
        styles.badge,
        styles.deleteIcon,
        styles.uploadedFile,
        styles.uploadedImageContainer,
        styles.uploadedImageContainerEnd,
        uploadedFiles,
    ]);

    return (
        <AppContainer>
            <AuthedContainer withBackButton>
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
                                <Typography
                                    variant="h6"
                                    sx={styles.categoryHeader}
                                >
                                    Select Categories:
                                </Typography>

                                <Box sx={styles.categoriesContainer}>
                                    {mappedCategories}
                                </Box>

                                <Typography
                                    variant="subtitle1"
                                    sx={styles.categorySubHeader}
                                >
                                    {`${selectedCategories.length} categories selected.`}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={styles.endAlignContainer}>
                                    {mappedFiles}
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
