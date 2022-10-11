import { Avatar, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import { usePage } from '@inertiajs/inertia-react';
import { IInertiaProps } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const ViewProfile: React.FC = () => {
    const {
        props: { user },
    } = usePage<IInertiaProps & IProps>();

    const styles = useStyles();

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

                                <Grid item xs={12}>
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
                    </Grid>
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default ViewProfile;
