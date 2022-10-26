import { Add } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import axios from 'axios';
import {
    CircularProgress,
    Typography,
    Tooltip,
    Button,
    Grid,
} from '@mui/material';

import { useStyles } from './hooks/useStyles';

const GenerateSignup: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    const [signupLink, setSignupLink] = useState<string | null>(null);
    const [generating, setGenerating] = useState(false);

    const generateSignupUrl = () => {
        setGenerating(true);

        axios
            .put('/admin/generateSignupUrl')
            .then(({ data }: { data: string }) => {
                setSignupLink(data);
            })
            .catch(() => {
                enqueueSnackbar('Failed to generate signup URL.', {
                    variant: 'error',
                });
            })
            .finally(() => {
                setGenerating(false);
            });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box sx={styles.centeredContainer}>
                    <Typography variant="h5">
                        <b>Generate a Signup Link</b>
                    </Typography>

                    <Typography variant="subtitle1">
                        The generated link will expire 24 hours from now. It can
                        only be used once.
                    </Typography>

                    <Button
                        disabled={generating}
                        onClick={generateSignupUrl}
                        variant="contained"
                        startIcon={<Add />}
                        style={styles.generateButton}
                    >
                        Generate
                    </Button>

                    {generating && (
                        <Box sx={styles.signupLinkContainer}>
                            <CircularProgress color="primary" />
                        </Box>
                    )}

                    {!generating && signupLink && (
                        <Box sx={styles.signupLinkContainer}>
                            <Tooltip title="Click to copy link">
                                <Typography
                                    variant="subtitle1"
                                    sx={styles.signupLink}
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            signupLink,
                                        );
                                    }}
                                >
                                    {signupLink}
                                </Typography>
                            </Tooltip>
                        </Box>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default GenerateSignup;
