import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';
import {
    Avatar,
    Grid,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

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

    const theme = useTheme();
    const styles = useStyles();
    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AppContainer>
            <AuthedContainer>
                <Paper sx={styles.paper}>
                    <Box sx={styles.profileTitleContainer}>
                        <Avatar
                            src={user.profile?.profilePicture?.url}
                            sx={styles.profilePicture}
                        />

                        <Typography variant={isMd ? 'h6' : 'h4'}>
                            <b>{user.profile?.username}</b>
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={isMd ? styles.bioMobile : styles.bio}
                        >
                            {user.profile?.bio}
                        </Typography>
                    </Box>

                    <Grid container spacing={3} sx={styles.detailsGrid}>
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h5"
                                sx={styles.profileAreaHeader}
                            >
                                <b>About</b>
                            </Typography>

                            <Typography variant="subtitle1">
                                <b>Joined:</b>{' '}
                                {moment
                                    .utc(user.createdAt)
                                    .local()
                                    .format('DD/MM/YYYY')}
                            </Typography>

                            <Typography variant="subtitle1">
                                <b>Location:</b>{' '}
                                {user.profile?.location ?? 'Unspecified'}
                            </Typography>

                            <Typography variant="subtitle1">
                                <b>User Role:</b>{' '}
                                {user.role.name === 'User'
                                    ? 'Forum User'
                                    : user.role.name}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h5">
                                <b>Statistics</b>
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default ViewProfile;
