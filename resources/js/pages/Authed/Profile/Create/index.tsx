import { Paper, Typography } from '@mui/material';
import React from 'react';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import useGetAuthedUser from 'app/hooks/getAuthedUser';
import { useStyles } from './hooks/useStyles';

const CreateProfile: React.FC = () => {
    const authedUser = useGetAuthedUser();
    const styles = useStyles();

    return (
        <AppContainer>
            <AuthedContainer>
                <Paper sx={styles.paper}>
                    <Typography variant="h3">
                        {"Let's create your profile!"}
                    </Typography>

                    <Typography variant="subtitle1">
                        {`We don't really want to keep having to call you ${authedUser.email}...`}
                    </Typography>
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default CreateProfile;
