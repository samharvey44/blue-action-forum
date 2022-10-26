import { Chip, Paper, Tooltip, Typography } from '@mui/material';
import { Link, usePage } from '@inertiajs/inertia-react';
import React, { useState } from 'react';
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
import { userIsAdmin } from 'app/helpers';
import { IProps } from './interfaces';

const ViewThread: React.FC = () => {
    const {
        props: { thread, reactions, comments },
    } = usePage<IInertiaProps & IProps>();

    const { enqueueSnackbar } = useSnackbar();
    const authedUser = useGetAuthedUser();
    const styles = useStyles();

    const [userIsFollowing, setUserIsFollowing] = useState(
        thread.userIsFollowing,
    );
    const [threadIsLocked, setThreadIsLocked] = useState(thread.isLocked);
    const [threadIsPinned, setThreadIsPinned] = useState(thread.isPinned);

    const [togglingFollowing, setTogglingFollowing] = useState(false);
    const [togglingLock, setTogglingLock] = useState(false);
    const [togglingPin, setTogglingPin] = useState(false);

    const toggleThreadLocked = () => {
        if (togglingLock) {
            return;
        }

        axios
            .patch(`/threads/${thread.id}/toggleLocked`)
            .then(({ data }: { data: boolean }) => {
                enqueueSnackbar(`Thread was ${data ? 'locked' : 'unlocked'}.`, {
                    variant: 'success',
                });

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
                enqueueSnackbar(`Thread was ${data ? 'pinned' : 'unpinned'}.`, {
                    variant: 'success',
                });

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
                    `Thread was ${data ? 'followed' : 'unfollowed'}.`,
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

    const authedUserIsAdmin = userIsAdmin(authedUser);

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
                        by{' '}
                        {thread.creator.isGhost ? (
                            thread.creator.profile?.username
                        ) : (
                            <Link
                                href={`/profiles/${thread.creator.profile?.id}`}
                                style={styles.profileLink}
                            >
                                <b>{thread.creator.profile?.username}</b>
                            </Link>
                        )}
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
                                    authedUserIsAdmin
                                        ? 'Click to unlock thread.'
                                        : 'Thread is locked.'
                                }
                            >
                                <Lock
                                    sx={
                                        authedUserIsAdmin
                                            ? styles.lockIcon
                                            : styles.lockIconNointeraction
                                    }
                                    onClick={() => {
                                        if (!authedUserIsAdmin) {
                                            return;
                                        }

                                        setTogglingLock(true);

                                        toggleThreadLocked();
                                    }}
                                />
                            </Tooltip>
                        ) : (
                            authedUserIsAdmin && (
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
                                    authedUserIsAdmin
                                        ? 'Click to unpin thread.'
                                        : 'Thread is pinned.'
                                }
                            >
                                <PushPin
                                    sx={
                                        authedUserIsAdmin
                                            ? styles.pinIcon
                                            : styles.pinIconPinnedNointeraction
                                    }
                                    onClick={() => {
                                        if (!authedUserIsAdmin) {
                                            return;
                                        }

                                        setTogglingPin(true);

                                        toggleThreadPinned();
                                    }}
                                />
                            </Tooltip>
                        ) : (
                            authedUserIsAdmin && (
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
