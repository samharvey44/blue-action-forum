import { Password, People, Warning } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import {
    ButtonGroup,
    Typography,
    Button,
    Paper,
    Box,
    Grid,
    useTheme,
    useMediaQuery,
} from '@mui/material';

import AppContainer from 'app/components/layout/AppContainer';
import AuthedContainer from '../components/AuthedContainer';
import GenerateSignup from './components/GenerateSignup';
import { useStyles } from './hooks/useStyles';
import Reports from './components/Reports';
import Users from './components/Users';
import { EAdminView } from './enums';

const Admin: React.FC = () => {
    const styles = useStyles();
    const theme = useTheme();

    const isLg = useMediaQuery(theme.breakpoints.down('lg'));

    const [currentView, setCurrentView] = useState(EAdminView.GenerateSignup);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        setDataLoading(true);
    }, [currentView]);

    return (
        <AppContainer>
            <AuthedContainer>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={styles.paper}>
                            <Box sx={styles.centeredContainer}>
                                <Typography variant="h4">
                                    <b>Administration Panel</b>
                                </Typography>

                                <ButtonGroup sx={styles.buttonGroup}>
                                    <Button
                                        variant={
                                            currentView ===
                                            EAdminView.GenerateSignup
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        startIcon={<Password />}
                                        onClick={() => {
                                            setCurrentView(
                                                EAdminView.GenerateSignup,
                                            );
                                        }}
                                        size={isLg ? 'small' : 'medium'}
                                    >
                                        Signup
                                    </Button>

                                    <Button
                                        variant={
                                            currentView === EAdminView.Users
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        startIcon={<People />}
                                        onClick={() => {
                                            setCurrentView(EAdminView.Users);
                                        }}
                                        size={isLg ? 'small' : 'medium'}
                                    >
                                        Users
                                    </Button>

                                    <Button
                                        variant={
                                            currentView === EAdminView.Reports
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        startIcon={<Warning />}
                                        onClick={() => {
                                            setCurrentView(EAdminView.Reports);
                                        }}
                                        size={isLg ? 'small' : 'medium'}
                                    >
                                        Reports
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={styles.paper}>
                            {currentView === EAdminView.GenerateSignup && (
                                <GenerateSignup />
                            )}

                            {currentView === EAdminView.Users && (
                                <Users
                                    dataLoading={dataLoading}
                                    setDataLoading={setDataLoading}
                                />
                            )}

                            {currentView === EAdminView.Reports && (
                                <Reports
                                    dataLoading={dataLoading}
                                    setDataLoading={setDataLoading}
                                />
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </AuthedContainer>
        </AppContainer>
    );
};

export default Admin;
