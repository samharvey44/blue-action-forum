import { Paper, Typography, Box, Button, Grid } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';
import { Add } from '@mui/icons-material';
import React from 'react';

import AppContainer from 'app/components/layout/AppContainer';
import AuthedContainer from '../components/AuthedContainer';
import useGetPeriodOfDay from 'app/hooks/periodOfDay/get';
import useGetAuthedUser from 'app/hooks/getAuthedUser';
import { useStyles } from './hooks/useStyles';

const Home: React.FC = () => {
    const periodOfDay = useGetPeriodOfDay();
    const authedUser = useGetAuthedUser();
    const styles = useStyles();

    return (
        <AppContainer>
            <AuthedContainer>
                <Paper sx={styles.homePaper}>
                    <Box sx={styles.paperInnerContainer}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <Box sx={styles.textContainer}>
                                    <Typography variant="h4">{`Good ${periodOfDay}, ${authedUser?.profile?.username}.`}</Typography>
                                    <Typography variant="subtitle1">
                                        Welcome back to Collective 6. Uppa
                                        Towen.
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={styles.startNewThreadContainer}>
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
            </AuthedContainer>
        </AppContainer>
    );
};

export default Home;
