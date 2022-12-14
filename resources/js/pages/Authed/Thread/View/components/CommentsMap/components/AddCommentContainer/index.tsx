import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Add, Clear, FileUpload } from '@mui/icons-material';
import { Inertia } from '@inertiajs/inertia';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';

import { formInitialValues } from './form/initialValues';
import { IPreviewableFile } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { formSchema } from './form/schema';
import { ellipsise } from 'app/helpers';
import { IProps } from './interfaces';

const AddCommentContainer: React.FC<IProps> = ({
    threadId,
    replyingTo,
    setReplyingTo,
    containerRef,
}) => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    const [uploadedFiles, setUploadedFiles] = useState<IPreviewableFile[]>([]);
    const fileUploadRef = useRef<HTMLInputElement | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const form = useFormik({
        initialValues: formInitialValues,
        validationSchema: formSchema,
        onSubmit: ({ content }, { resetForm }) => {
            setSubmitting(true);

            Inertia.post(
                `/threads/${threadId}/comment`,
                {
                    content,
                    images: uploadedFiles.map(
                        (uploadedFile) => uploadedFile.file,
                    ),
                    replyingTo: replyingTo?.id ?? null,
                },
                {
                    preserveScroll: true,

                    onSuccess: () => {
                        enqueueSnackbar('Comment created.', {
                            variant: 'success',
                        });

                        setUploadedFiles([]);
                        resetForm();

                        setReplyingTo(null);
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

        if ([...uploadedFiles, ...filesArr].length > 5) {
            return enqueueSnackbar(
                'You may only upload a maximum of 5 images per comment.',
                {
                    variant: 'error',
                },
            );
        }

        setUploadedFiles((currFiles) => [
            ...currFiles,
            ...filesArr.map((file) => ({
                file: file,
                key: Math.random(),
                displayUrl: URL.createObjectURL(file),
            })),
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

    const mappedFiles = useMemo(
        () =>
            uploadedFiles.map(({ displayUrl, key }, index, self) => (
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
            )),
        [
            handleFileRemove,
            styles.badge,
            styles.deleteIcon,
            styles.uploadedFile,
            styles.uploadedImageContainer,
            styles.uploadedImageContainerEnd,
            uploadedFiles,
        ],
    );

    return (
        <form onSubmit={form.handleSubmit}>
            <Paper sx={styles.paper}>
                {replyingTo ? (
                    <React.Fragment>
                        <Box sx={styles.replyingToHeaderContainer}>
                            <Clear
                                sx={styles.replyingToClearIcon}
                                onClick={() => {
                                    setReplyingTo(null);
                                }}
                            />

                            <Typography variant="h6">
                                Replying to{' '}
                                <span style={styles.replyingToText}>
                                    {replyingTo.creator.profile?.username}
                                </span>
                            </Typography>
                        </Box>

                        <Typography variant="subtitle1">
                            {ellipsise(replyingTo.content ?? '', 25)}
                        </Typography>
                    </React.Fragment>
                ) : (
                    <Typography variant="h6">
                        Get involved with the discussion!
                    </Typography>
                )}

                <Box sx={styles.commentFormContainer} ref={containerRef}>
                    <TextField
                        label="Leave a comment..."
                        variant="filled"
                        name="content"
                        value={form.values.content}
                        onChange={form.handleChange}
                        error={form.touched.content && !!form.errors.content}
                        helperText={form.touched.content && form.errors.content}
                        sx={styles.commentField}
                        rows={8}
                        multiline
                        required
                    />

                    <Box sx={styles.endAlignContainer}>{mappedFiles}</Box>

                    <Box sx={styles.imageUploadsInfoContainer}>
                        <Typography variant="subtitle1">
                            {`${uploadedFiles.length} file(s) uploaded.`}
                        </Typography>
                    </Box>

                    <Box sx={styles.endAlignContainer}>
                        <Button
                            disabled={uploadedFiles.length === 5}
                            onClick={() => {
                                fileUploadRef.current?.click();
                            }}
                            startIcon={<FileUpload />}
                            sx={styles.uploadButton}
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
                </Box>

                <input
                    style={styles.hiddenImageUpload}
                    onChange={handleFileUpload}
                    ref={fileUploadRef}
                    accept="image/*"
                    type="file"
                    multiple
                />
            </Paper>
        </form>
    );
};

export default AddCommentContainer;
