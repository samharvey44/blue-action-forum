import { Add, Clear, History, Search, Whatshot } from '@mui/icons-material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
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

import ThreadsMapContainer from './components/ThreadsMapContainer';
import AppContainer from 'app/components/layout/AppContainer';
import AuthedContainer from '../components/AuthedContainer';
import useGetPeriodOfDay from 'app/hooks/periodOfDay/get';
import useGetAuthedUser from 'app/hooks/getAuthedUser';
import { IPaginatedThreads } from 'app/interfaces';
import { IRememberedProps } from './interfaces';
import { useStyles } from './hooks/useStyles';
import { EFilter } from './enums';

const Home: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    const periodOfDay = useGetPeriodOfDay();
    const authedUser = useGetAuthedUser();
    const styles = useStyles();

    const [currentFilter, setCurrentFilter] = useState<EFilter>(EFilter.Hot);
    const [threadsLoading, setThreadsLoading] = useState(true);
    const [threadSearch, setThreadSearch] = useState('');
    const [initialLoad, setInitialLoad] = useState(true);
    const [currentThreads, setCurrentThreads] =
        useState<IPaginatedThreads | null>(null);

    const handleGetThreads = useCallback(
        (page: number, filter: EFilter, search?: string) => {
            setThreadsLoading(true);

            axios
                .get('/threads', {
                    params: {
                        page,
                        filter,
                        search,
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
        },
        [enqueueSnackbar],
    );

    useEffect(() => {
        if (!initialLoad) {
            return;
        }

        const props = Inertia.restore('ajaxProps') as IRememberedProps;

        if (props) {
            const { page, filter, search } = props;

            setCurrentFilter(filter);
            setThreadSearch(search);

            handleGetThreads(page, filter, search);
        } else {
            handleGetThreads(1, currentFilter, threadSearch);
        }

        setInitialLoad(false);
    }, [currentFilter, handleGetThreads, initialLoad, threadSearch]);

    const searchContainer = useMemo(
        () => (
            <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                    <Box sx={styles.searchContainer}>
                        <TextField
                            value={threadSearch}
                            onChange={({ target: { value } }) => {
                                setThreadSearch(value);
                            }}
                            variant="filled"
                            label="Search for a thread..."
                            sx={styles.searchField}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Box sx={styles.searchContainer}>
                        <Button
                            sx={styles.searchButton}
                            variant="contained"
                            onClick={() => {
                                handleGetThreads(
                                    currentThreads?.meta.current_page ?? 1,
                                    currentFilter,
                                    threadSearch,
                                );
                            }}
                        >
                            {<Search />}
                        </Button>

                        <Button
                            sx={styles.clearButton}
                            variant="contained"
                            onClick={() => {
                                if (threadSearch === '') {
                                    return;
                                }

                                setThreadSearch('');

                                handleGetThreads(
                                    currentThreads?.meta.current_page ?? 1,
                                    currentFilter,
                                    '',
                                );
                            }}
                        >
                            {<Clear />}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        ),
        [
            currentThreads?.meta.current_page,
            styles.searchContainer,
            styles.searchButton,
            styles.searchField,
            styles.clearButton,
            handleGetThreads,
            currentFilter,
            threadSearch,
        ],
    );

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
                                <Grid item xs={12} lg={6}>
                                    {searchContainer}
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <Box sx={styles.buttonGroupContainer}>
                                        <ButtonGroup>
                                            <Button
                                                variant={
                                                    currentFilter ===
                                                    EFilter.Hot
                                                        ? 'contained'
                                                        : 'outlined'
                                                }
                                                startIcon={<Whatshot />}
                                                onClick={() => {
                                                    handleGetThreads(
                                                        currentThreads?.meta
                                                            .current_page ?? 1,
                                                        EFilter.Hot,
                                                        threadSearch,
                                                    );

                                                    setCurrentFilter(
                                                        EFilter.Hot,
                                                    );
                                                }}
                                            >
                                                Hot
                                            </Button>

                                            <Button
                                                variant={
                                                    currentFilter ===
                                                    EFilter.New
                                                        ? 'contained'
                                                        : 'outlined'
                                                }
                                                startIcon={<History />}
                                                onClick={() => {
                                                    handleGetThreads(
                                                        currentThreads?.meta
                                                            .current_page ?? 1,
                                                        EFilter.New,
                                                        threadSearch,
                                                    );

                                                    setCurrentFilter(
                                                        EFilter.New,
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
                        ) : (
                            <ThreadsMapContainer
                                threads={currentThreads}
                                handleGetThreads={handleGetThreads}
                                filter={currentFilter}
                                search={threadSearch}
                            />
                        )}
                    </Grid>
                </Grid>
            </AuthedContainer>
        </AppContainer>
    );
};

export default Home;
