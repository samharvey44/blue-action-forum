import { Circle, Lock, LockOpen, PushPin } from '@mui/icons-material';
import { Chip, Paper, Tooltip, Typography } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import moment from 'moment';
import axios from 'axios';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import useGetAuthedUser from 'app/hooks/getAuthedUser';
import CommentsMap from './components/CommentsMap';
import { IInertiaProps } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const ViewThread: React.FC = () => {
    const {
        props: { thread, reactions, comments },
    } = usePage<IInertiaProps & IProps>();

    const { enqueueSnackbar } = useSnackbar();
    const authedUser = useGetAuthedUser();
    const styles = useStyles();

    const [threadIsLocked, setThreadIsLocked] = useState(thread.isLocked);
    const [threadIsPinned, setThreadIsPinned] = useState(thread.isPinned);

    const [togglingLock, setTogglingLock] = useState(false);
    const [togglingPin, setTogglingPin] = useState(false);

    useEffect(() => {
        // Allow the 'Grow' animation to occur and page length be fully
        // defined before scrolling to the top of the page.
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    }, []);

    const toggleThreadLocked = () => {
        if (togglingLock) {
            return;
        }

        axios
            .patch(`/threads/${thread.id}/toggleLocked`)
            .then(() => {
                enqueueSnackbar(
                    `Thread was ${
                        threadIsLocked ? 'unlocked' : 'locked'
                    } successfully.`,
                    {
                        variant: 'success',
                    },
                );

                setThreadIsLocked((curr) => !curr);
            })
            .catch(() => {
                enqueueSnackbar('Something went wrong!', {
                    variant: 'error',
                });
            })
            .finally(() => {
                setTogglingLock(false);
            });
    };

    const toggleThreadPinned = () => {
        if (togglingPin) {
            return;
        }

        axios
            .patch(`/threads/${thread.id}/togglePinned`)
            .then(() => {
                enqueueSnackbar(
                    `Thread was ${
                        threadIsPinned ? 'unpinned' : 'pinned'
                    } successfully.`,
                    {
                        variant: 'success',
                    },
                );

                setThreadIsPinned((curr) => !curr);
            })
            .catch(() => {
                enqueueSnackbar('Something went wrong!', {
                    variant: 'error',
                });
            })
            .finally(() => {
                setTogglingPin(false);
            });
    };

    return (
        <AppContainer>
            <AuthedContainer withBackButton>
                <Paper sx={styles.titlePaper}>
                    <Typography variant="h3">{thread.title}</Typography>

                    <Typography variant="subtitle1">
                        Thread created{' '}
                        <b>
                            {moment
                                .utc(thread.createdAt)
                                .local()
                                .format('DD/MM/YYYY [at] HH:mm')}
                        </b>{' '}
                        by <b>{thread.creator.profile?.username}</b>
                    </Typography>

                    <Box sx={styles.outerCategoriesMapContainer}>
                        <Box sx={styles.categoriesMapContainer}>
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
                    </Box>

                    {['Super Admin', 'Admin'].some(
                        (role) => role === authedUser?.role.name,
                    ) && (
                        <Box sx={styles.actionsContainer}>
                            {threadIsLocked ? (
                                <Tooltip title="Click to unlock thread.">
                                    <Lock
                                        sx={styles.lockIcon}
                                        onClick={() => {
                                            setTogglingLock(true);

                                            toggleThreadLocked();
                                        }}
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Click to lock thread.">
                                    <LockOpen
                                        sx={styles.lockIcon}
                                        onClick={() => {
                                            setTogglingLock(true);

                                            toggleThreadLocked();
                                        }}
                                    />
                                </Tooltip>
                            )}

                            {threadIsPinned ? (
                                <Tooltip title="Click to unpin thread.">
                                    <PushPin
                                        sx={styles.pinIconPinned}
                                        onClick={() => {
                                            setTogglingPin(true);

                                            toggleThreadPinned();
                                        }}
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Click to pin thread.">
                                    <PushPin
                                        sx={styles.pinIconUnpinned}
                                        onClick={() => {
                                            setTogglingPin(true);

                                            toggleThreadPinned();
                                        }}
                                    />
                                </Tooltip>
                            )}
                        </Box>
                    )}
                </Paper>

                <Box sx={styles.commentsMapContainer}>
                    {
                        <CommentsMap
                            threadId={thread.id}
                            reactions={reactions}
                            comments={comments}
                            threadCreatorId={thread.creator.id}
                        />
                    }
                </Box>
            </AuthedContainer>
        </AppContainer>
    );
};

export default ViewThread;
