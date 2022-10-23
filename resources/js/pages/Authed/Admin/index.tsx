import { Password, People, Warning } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import {
    ButtonGroup,
    Typography,
    Button,
    Paper,
    Box,
    Grid,
} from '@mui/material';

import AppContainer from 'app/components/layout/AppContainer';
import AuthedContainer from '../components/AuthedContainer';
import GenerateSignup from './components/GenerateSignup';
import { useStyles } from './hooks/useStyles';
import Users from './components/Users';
import { EAdminView } from './enums';

const Admin: React.FC = () => {
    const styles = useStyles();

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
                        </Paper>
                    </Grid>
                </Grid>
            </AuthedContainer>
        </AppContainer>
    );
};

export default Admin;
