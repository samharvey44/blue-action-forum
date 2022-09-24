import { Box, Button, Chip, Grid, Paper, Typography } from '@mui/material';
import { Circle, Visibility } from '@mui/icons-material';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import moment from 'moment';
import React from 'react';

import PaginationContainer from './components/PaginationContainer';
import { useStyles } from './hooks/useStyles';
import { ellipsise } from 'app/helpers';
import { IProps } from './interfaces';

const ThreadsMapContainer: React.FC<IProps> = ({
    threads,
    handleGetThreads,
    filter,
    search,
}) => {
    const styles = useStyles();

    // We'll remember our search terms so that the user is returned to the
    // same page of results when they navigate back.
    const rememberProps = () => {
        Inertia.remember(
            {
                page: threads?.meta.current_page ?? 1,
                filter,
                search,
            },
            'ajaxProps',
        );
    };

    return (
        <Grid container spacing={3}>
            {threads?.data.map((thread) => (
                <Grid item xs={12} key={thread.id}>
                    <Paper sx={styles.threadPaper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box sx={styles.threadContentContainer}>
                                    <Typography variant="h5">
                                        <b>{thread.title}</b>
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={styles.innerThreadContainer}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={styles.createdAtText}
                                    >
                                        Created:{' '}
                                        {moment
                                            .utc(thread.createdAt)
                                            .local()
                                            .format(
                                                'DD/MM/YYYY [at] HH:mm',
                                            )}{' '}
                                        by {thread.creator.profile?.username}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={styles.threadContentContainer}>
                                    <Typography variant="subtitle2">
                                        <b>
                                            {
                                                thread.mostRecentComment
                                                    ?.creator.profile?.username
                                            }
                                        </b>
                                        {` said: ${ellipsise(
                                            thread.mostRecentComment?.content ??
                                                '',
                                            30,
                                        )}`}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={styles.categoriesContainer}>
                                    {thread.categories.map(
                                        ({ id, name, displayColor }) => (
                                            <Chip
                                                icon={
                                                    <Circle
                                                        sx={{
                                                            color: `${displayColor} !important`,
                                                        }}
                                                    />
                                                }
                                                sx={styles.category}
                                                variant="filled"
                                                label={name}
                                                key={id}
                                            />
                                        ),
                                    )}
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={styles.innerThreadContainerRightAlign}>
                                    <Link
                                        href={`/threads/${thread.id}`}
                                        style={styles.threadLink}
                                        onClick={() => {
                                            rememberProps();
                                        }}
                                    >
                                        <Button
                                            startIcon={<Visibility />}
                                            variant="contained"
                                            size="small"
                                        >
                                            View
                                        </Button>
                                    </Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            ))}

            <Grid item xs={12}>
                <PaginationContainer
                    threads={threads}
                    handleGetThreads={handleGetThreads}
                    filter={filter}
                    search={search}
                />
            </Grid>
        </Grid>
    );
};

export default ThreadsMapContainer;
