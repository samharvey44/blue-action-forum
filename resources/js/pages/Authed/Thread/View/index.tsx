import { Chip, Paper, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import moment from 'moment';
import axios from 'axios';
import {
    Circle,
    Lock,
    LockOpen,
    PushPin,
    PushPinOutlined,
    Subscriptions,
    SubscriptionsOutlined,
} from '@mui/icons-material';

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

    const userIsAdmin = useMemo(
        () =>
            ['Super Admin', 'Admin'].some(
                (role) => role === authedUser?.role.name,
            ),
        [authedUser?.role.name],
    );

    const [userIsFollowing, setUserIsFollowing] = useState(
        !!thread.usersFollowing.filter(({ id }) => id === authedUser?.id)
            .length,
    );
    const [threadIsLocked, setThreadIsLocked] = useState(thread.isLocked);
    const [threadIsPinned, setThreadIsPinned] = useState(thread.isPinned);

    const [togglingFollowing, setTogglingFollowing] = useState(false);
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
            .then(({ data }: { data: boolean }) => {
                enqueueSnackbar(
                    `Thread was ${data ? 'locked' : 'unlocked'} successfully.`,
                    {
                        variant: 'success',
                    },
                );

                setThreadIsLocked(data);
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
            .then(({ data }: { data: boolean }) => {
                enqueueSnackbar(
                    `Thread was ${data ? 'pinned' : 'unpinned'} successfully.`,
                    {
                        variant: 'success',
                    },
                );

                setThreadIsPinned(data);
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

    const toggleFollowing = () => {
        if (togglingFollowing) {
            return;
        }

        axios
            .patch(`/threads/${thread.id}/toggleFollowing`)
            .then(({ data }: { data: boolean }) => {
                enqueueSnackbar(
                    `Thread was ${
                        data ? 'followed' : 'unfollowed'
                    } successfully.`,
                    {
                        variant: 'success',
                    },
                );

                setUserIsFollowing(data);
            })
            .catch(() => {
                enqueueSnackbar('Something went wrong!', {
                    variant: 'error',
                });
            })
            .finally(() => {
                setTogglingFollowing(false);
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

                    <Box sx={styles.actionsContainer}>
                        {threadIsLocked ? (
                            <Tooltip
                                title={
                                    userIsAdmin
                                        ? 'Click to unlock thread.'
                                        : 'Thread is locked.'
                                }
                            >
                                <Lock
                                    sx={
                                        userIsAdmin
                                            ? styles.lockIcon
                                            : styles.lockIconNointeraction
                                    }
                                    onClick={() => {
                                        if (!userIsAdmin) {
                                            return;
                                        }

                                        setTogglingLock(true);

                                        toggleThreadLocked();
                                    }}
                                />
                            </Tooltip>
                        ) : (
                            userIsAdmin && (
                                <Tooltip title="Click to lock thread.">
                                    <LockOpen
                                        sx={styles.lockIcon}
                                        onClick={() => {
                                            setTogglingLock(true);

                                            toggleThreadLocked();
                                        }}
                                    />
                                </Tooltip>
                            )
                        )}

                        {threadIsPinned ? (
                            <Tooltip
                                title={
                                    userIsAdmin
                                        ? 'Click to unpin thread.'
                                        : 'Thread is pinned.'
                                }
                            >
                                <PushPin
                                    sx={
                                        userIsAdmin
                                            ? styles.pinIcon
                                            : styles.pinIconPinnedNointeraction
                                    }
                                    onClick={() => {
                                        if (!userIsAdmin) {
                                            return;
                                        }

                                        setTogglingPin(true);

                                        toggleThreadPinned();
                                    }}
                                />
                            </Tooltip>
                        ) : (
                            userIsAdmin && (
                                <Tooltip title="Click to pin thread.">
                                    <PushPinOutlined
                                        sx={styles.pinIcon}
                                        onClick={() => {
                                            setTogglingPin(true);

                                            toggleThreadPinned();
                                        }}
                                    />
                                </Tooltip>
                            )
                        )}

                        {userIsFollowing ? (
                            <Tooltip title="Unfollow this thread.">
                                <Subscriptions
                                    sx={styles.subscriptionIcon}
                                    onClick={() => {
                                        setTogglingFollowing(true);

                                        toggleFollowing();
                                    }}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Follow this thread.">
                                <SubscriptionsOutlined
                                    sx={styles.subscriptionIcon}
                                    onClick={() => {
                                        setTogglingFollowing(true);

                                        toggleFollowing();
                                    }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                </Paper>

                <Box sx={styles.commentsMapContainer}>
                    {
                        <CommentsMap
                            threadId={thread.id}
                            reactions={reactions}
                            comments={comments}
                            threadCreatorId={thread.creator.id}
                            threadIsLocked={thread.isLocked}
                        />
                    }
                </Box>
            </AuthedContainer>
        </AppContainer>
    );
};

export default ViewThread;
