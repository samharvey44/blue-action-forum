import { Avatar, Grid, Paper, Tooltip, Typography } from '@mui/material';
import { Edit, Report, ReportProblem } from '@mui/icons-material';
import { Link, usePage } from '@inertiajs/inertia-react';
import React, { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import moment from 'moment';
import axios from 'axios';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import useGetAuthedUser from 'app/hooks/getAuthedUser';
import { IInertiaProps } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const ViewProfile: React.FC = () => {
    const {
        props: { user },
    } = usePage<IInertiaProps & IProps>();

    const { enqueueSnackbar } = useSnackbar();
    const authedUser = useGetAuthedUser();
    const styles = useStyles();

    const [reportedByUser, setReportedByUser] = useState(
        user.profile?.isReportedByUser ?? false,
    );
    const [reportingProfile, setReportingProfile] = useState(false);

    const handleToggleReported = () => {
        setReportingProfile(true);

        axios
            .patch(`/profiles/${user.profile?.id}/report`)
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

    const userIsAdmin = useMemo(
        () => ['Super Admin', 'Admin'].some((r) => r === authedUser?.role.name),
        [authedUser?.role.name],
    );

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
                                            {user.role.name === 'User'
                                                ? 'Forum User'
                                                : user.role.name}
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
                                    <Link href="/profiles/edit">
                                        <Tooltip title="Edit your profile.">
                                            <Edit style={styles.editIcon} />
                                        </Tooltip>
                                    </Link>
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

                                {userIsAdmin && user.profile?.isReported && (
                                    <Tooltip title="Profile has been reported by a user.">
                                        <ReportProblem
                                            style={styles.reportIconReported}
                                        />
                                    </Tooltip>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default ViewProfile;
