import { Link, usePage } from '@inertiajs/inertia-react';
import React, { Fragment, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import moment from 'moment';
import axios from 'axios';
import {
    Block,
    Delete,
    Done,
    Edit,
    GroupAdd,
    GroupRemove,
    Pin,
    Report,
    ReportProblem,
} from '@mui/icons-material';
import {
    Grid,
    Modal,
    Paper,
    Avatar,
    Button,
    Tooltip,
    Typography,
} from '@mui/material';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import useGetAuthedUser from 'app/hooks/getAuthedUser';
import { IInertiaProps } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { userIsAdmin } from 'app/helpers';
import { IProps } from './interfaces';

const ViewProfile: React.FC = () => {
    const {
        props: { user },
    } = usePage<IInertiaProps & IProps>();

    const { enqueueSnackbar } = useSnackbar();
    const authedUser = useGetAuthedUser();
    const styles = useStyles();

    const [isSuspended, setIsSuspended] = useState(user.isSuspended ?? false);
    const [isSuper, setIsSuper] = useState(user.role.name === 'Super Admin');
    const [isAdmin, setIsAdmin] = useState(user.role.name === 'Admin');
    const [reportedByUser, setReportedByUser] = useState(
        user.profile?.isReportedByUser ?? false,
    );

    const [suspendingProfile, setSuspendingProfile] = useState(false);
    const [reportingProfile, setReportingProfile] = useState(false);
    const [togglingAdmin, setTogglingAdmin] = useState(false);
    const [deletingUser, setDeletingUser] = useState(false);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [adminModalOpen, setAdminModalOpen] = useState(false);

    const handleToggleReported = () => {
        setReportingProfile(true);

        axios
            .patch(`/profiles/${user.profile?.id}/toggleReported`)
            .then(({ data }: { data: boolean }) => {
                enqueueSnackbar(
                    `Profile was ${data ? 'reported' : 'unreported'}.`,
                    {
                        variant: 'success',
                    },
                );

                setReportedByUser(data);
            })
            .catch(() => {
                enqueueSnackbar('Something went wrong!', {
                    variant: 'error',
                });
            })
            .finally(() => {
                setReportingProfile(false);
            });
    };

    const handleDeleteAccount = () => {
        setDeletingUser(true);

        axios
            .delete(`/profiles/${user.profile?.id}`)
            .then(() => {
                Inertia.visit('/');

                enqueueSnackbar(`Your account was deleted.`, {
                    variant: 'success',
                });
            })
            .catch(() => {
                enqueueSnackbar('Something went wrong!', {
                    variant: 'error',
                });
            })
            .finally(() => {
                setDeletingUser(false);
            });
    };

    const handleToggleSuspended = () => {
        setSuspendingProfile(true);

        axios
            .patch(`/profiles/${user.profile?.id}/toggleSuspended`)
            .then(({ data }: { data: boolean }) => {
                enqueueSnackbar(
                    `Account was ${data ? 'suspended' : 'unsuspended'}.`,
                    {
                        variant: 'success',
                    },
                );

                setIsSuspended(data);
            })
            .catch(() => {
                enqueueSnackbar('Something went wrong!', {
                    variant: 'error',
                });
            })
            .finally(() => {
                setSuspendingProfile(false);
            });
    };

    const handleToggleAdminStatus = () => {
        setTogglingAdmin(true);

        axios
            .patch(`/profiles/${user.profile?.id}/toggleAdmin`)
            .then(({ data }: { data: boolean }) => {
                enqueueSnackbar(
                    `Account was ${data ? 'made admin' : 'downgraded'}.`,
                    {
                        variant: 'success',
                    },
                );

                setAdminModalOpen(false);
                setIsAdmin(data);
            })
            .catch(() => {
                enqueueSnackbar('Something went wrong!', {
                    variant: 'error',
                });
            })
            .finally(() => {
                setTogglingAdmin(false);
            });
    };

    return (
        <AppContainer>
            <AuthedContainer withBackButton>
                <Paper sx={styles.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={4}>
                            <Box sx={styles.centerContainer}>
                                <Avatar
                                    src={user.profile?.profilePicture?.url}
                                    sx={styles.profilePicture}
                                />

                                <Typography variant="h5">
                                    <b>{user.profile?.username}</b>
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} lg={8}>
                            <Grid container spacing={3}>
                                <Grid item xs={6} lg={3}>
                                    <Box sx={styles.centerContainer}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={styles.primaryText}
                                        >
                                            <b>Registered on:</b>
                                        </Typography>

                                        <Typography variant="subtitle1">
                                            {moment
                                                .utc(user.createdAt)
                                                .local()
                                                .format('DD/MM/YYYY')}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={6} lg={3}>
                                    <Box sx={styles.centerContainer}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={styles.primaryText}
                                        >
                                            <b>Last seen:</b>
                                        </Typography>

                                        <Typography variant="subtitle1">
                                            {user.lastSeen
                                                ? moment
                                                      .utc(user.lastSeen)
                                                      .local()
                                                      .fromNow()
                                                : 'Never'}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={6} lg={3}>
                                    <Box sx={styles.centerContainer}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={styles.primaryText}
                                        >
                                            <b>User Role:</b>
                                        </Typography>

                                        <Typography variant="subtitle1">
                                            {user.role.name === 'Super' &&
                                                user.role.name}

                                            {isAdmin ? 'Admin' : 'Forum User'}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={6} lg={3}>
                                    <Box sx={styles.centerContainer}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={styles.primaryText}
                                        >
                                            <b>Location:</b>
                                        </Typography>

                                        <Typography variant="subtitle1">
                                            {user.profile?.location ??
                                                'Unspecified'}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sx={styles.bioContainer}>
                                    <Box sx={styles.centerContainer}>
                                        <Typography
                                            variant="subtitle1"
                                            sx={styles.bioText}
                                        >
                                            {user.profile?.bio ??
                                                'User has not set a bio.'}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={styles.endAlignContainer}>
                                {user.profile?.id ===
                                    authedUser?.profile?.id && (
                                    <Fragment>
                                        <Link href="/profiles/edit">
                                            <Tooltip title="Edit your profile.">
                                                <Edit style={styles.editIcon} />
                                            </Tooltip>
                                        </Link>

                                        <Link href="/profiles/password-reset">
                                            <Tooltip title="Reset your password.">
                                                <Pin
                                                    style={styles.actionIcon}
                                                />
                                            </Tooltip>
                                        </Link>

                                        {!userIsAdmin(user) && (
                                            <Tooltip title="Delete your profile.">
                                                <Delete
                                                    style={styles.actionIcon}
                                                    onClick={() => {
                                                        setDeleteModalOpen(
                                                            true,
                                                        );
                                                    }}
                                                />
                                            </Tooltip>
                                        )}
                                    </Fragment>
                                )}

                                {user.profile?.id !==
                                    authedUser?.profile?.id && (
                                    <Tooltip
                                        title={
                                            reportedByUser
                                                ? 'Unreport this profile.'
                                                : 'Report this profile.'
                                        }
                                    >
                                        <Report
                                            onClick={() => {
                                                if (reportingProfile) {
                                                    return;
                                                }

                                                handleToggleReported();
                                            }}
                                            sx={
                                                reportedByUser
                                                    ? styles.reportIconReported
                                                    : styles.actionIcon
                                            }
                                        />
                                    </Tooltip>
                                )}

                                {userIsAdmin(authedUser) &&
                                    user.profile?.isReported && (
                                        <Tooltip title="Profile has been reported by a user.">
                                            <ReportProblem
                                                style={
                                                    styles.reportIconReported
                                                }
                                            />
                                        </Tooltip>
                                    )}

                                {userIsAdmin(authedUser) &&
                                    !isSuper &&
                                    (isAdmin ? (
                                        <Tooltip title="Click to downgrade to user.">
                                            <GroupRemove
                                                style={styles.actionIcon}
                                                onClick={() => {
                                                    if (togglingAdmin) {
                                                        return;
                                                    }

                                                    handleToggleAdminStatus();
                                                }}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Click to upgrade to admin.">
                                            <GroupAdd
                                                style={styles.actionIcon}
                                                onClick={() => {
                                                    setAdminModalOpen(true);
                                                }}
                                            />
                                        </Tooltip>
                                    ))}

                                {userIsAdmin(authedUser) && !userIsAdmin(user) && (
                                    <Tooltip
                                        title={
                                            isSuspended
                                                ? 'Unsuspend this user.'
                                                : 'Suspend this user.'
                                        }
                                    >
                                        <Block
                                            onClick={() => {
                                                if (suspendingProfile) {
                                                    return;
                                                }

                                                handleToggleSuspended();
                                            }}
                                            style={
                                                isSuspended
                                                    ? styles.reportIconReported
                                                    : styles.actionIcon
                                            }
                                        />
                                    </Tooltip>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                <Modal
                    open={deleteModalOpen}
                    onClose={() => {
                        setDeleteModalOpen(false);
                    }}
                >
                    <Box sx={styles.innerModalContainer}>
                        <Typography variant="subtitle1">
                            <b>Are you sure you wish to delete your account?</b>
                        </Typography>
                        <Typography variant="subtitle2">
                            This action cannot be undone.
                        </Typography>

                        <Button
                            startIcon={<Delete />}
                            sx={styles.deleteButton}
                            variant="contained"
                            onClick={() => {
                                if (deletingUser) {
                                    return;
                                }

                                handleDeleteAccount();
                            }}
                        >
                            Delete Account
                        </Button>
                    </Box>
                </Modal>

                <Modal
                    open={adminModalOpen}
                    onClose={() => {
                        setAdminModalOpen(false);
                    }}
                >
                    <Box sx={styles.innerModalContainer}>
                        <Typography variant="subtitle1">
                            <b>
                                Are you sure you wish to make this user an
                                admin?
                            </b>
                        </Typography>
                        <Typography variant="subtitle2">
                            Please check you are upgrading the correct user
                            before proceeding.
                        </Typography>

                        <Button
                            onClick={() => {
                                if (togglingAdmin) {
                                    return;
                                }

                                handleToggleAdminStatus();
                            }}
                            sx={styles.deleteButton}
                            startIcon={<Done />}
                            variant="contained"
                        >
                            Upgrade Account
                        </Button>
                    </Box>
                </Modal>
            </AuthedContainer>
        </AppContainer>
    );
};

export default ViewProfile;
