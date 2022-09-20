import { Add, History, Search, Whatshot } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import {
    ButtonGroup,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Box,
    CircularProgress,
} from '@mui/material';

import AppContainer from 'app/components/layout/AppContainer';
import AuthedContainer from '../components/AuthedContainer';
import useGetPeriodOfDay from 'app/hooks/periodOfDay/get';
import useGetAuthedUser from 'app/hooks/getAuthedUser';
import { IPaginatedThreads } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { EFIlter } from './enums';

const Home: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const periodOfDay = useGetPeriodOfDay();
    const authedUser = useGetAuthedUser();
    const styles = useStyles();

    const [currentFilter, setCurrentFilter] = useState<EFIlter>(EFIlter.Hot);
    const [threadsLoading, setThreadsLoading] = useState(true);
    const [threadSearch, setThreadSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentThreads, setCurrentThreads] =
        useState<IPaginatedThreads | null>(null);

    const handleGetThreads = useCallback(() => {
        axios
            .get('/threads', {
                params: {
                    page: currentPage,
                    filter: currentFilter,
                },
            })
            .then(({ data }) => {
                setCurrentThreads(data);

                setThreadsLoading(false);
            })
            .catch(() => {
                enqueueSnackbar('Failed to get threads!', {
                    variant: 'error',
                });
            });
    }, [enqueueSnackbar, currentPage, currentFilter]);

    useEffect(() => {
        handleGetThreads();
    }, [handleGetThreads]);

    return (
        <AppContainer>
            <AuthedContainer>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={styles.homePaper}>
                            <Box sx={styles.paperInnerContainer}>
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={styles.textContainer}>
                                            <Typography variant="h4">{`Good ${periodOfDay}, ${authedUser?.profile?.username}.`}</Typography>
                                            <Typography variant="subtitle1">
                                                Welcome back to Collective 6.
                                                Uppa Towen.
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box
                                            sx={styles.startNewThreadContainer}
                                        >
                                            <Link
                                                href="/threads/create"
                                                style={styles.createThreadLink}
                                            >
                                                <Button
                                                    variant="contained"
                                                    startIcon={<Add />}
                                                    color="primary"
                                                >
                                                    Start New Thread
                                                </Button>
                                            </Link>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={styles.filtersPaper}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={9} md={10}>
                                            <Box sx={styles.searchContainer}>
                                                <TextField
                                                    value={threadSearch}
                                                    onChange={(e) => {
                                                        setThreadSearch(
                                                            e.target.value,
                                                        );
                                                    }}
                                                    variant="filled"
                                                    label="Search for a thread..."
                                                    sx={styles.searchField}
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={3} md={2}>
                                            <Box sx={styles.searchContainer}>
                                                <Button
                                                    sx={styles.searchButton}
                                                    variant="contained"
                                                >
                                                    {<Search />}
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box sx={styles.buttonGroupContainer}>
                                        <ButtonGroup>
                                            <Button
                                                variant={
                                                    currentFilter ===
                                                    EFIlter.Hot
                                                        ? 'contained'
                                                        : 'outlined'
                                                }
                                                startIcon={<Whatshot />}
                                                onClick={() => {
                                                    setCurrentFilter(
                                                        EFIlter.Hot,
                                                    );
                                                }}
                                            >
                                                Hot
                                            </Button>

                                            <Button
                                                variant={
                                                    currentFilter ===
                                                    EFIlter.New
                                                        ? 'contained'
                                                        : 'outlined'
                                                }
                                                startIcon={<History />}
                                                onClick={() => {
                                                    setCurrentFilter(
                                                        EFIlter.New,
                                                    );
                                                }}
                                            >
                                                New
                                            </Button>
                                        </ButtonGroup>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        {threadsLoading ? (
                            <Box sx={styles.loadingContainer}>
                                <CircularProgress color="primary" />

                                <Typography
                                    variant="h6"
                                    sx={styles.threadsLoadingText}
                                >
                                    Threads loading...
                                </Typography>
                            </Box>
                        ) : null}
                    </Grid>
                </Grid>
            </AuthedContainer>
        </AppContainer>
    );
};

export default Home;
