import Typography from '@mui/material/Typography';
import MUIAppBar from '@mui/material/AppBar';
import { Outlet } from 'react-router-dom';
import React, { Fragment } from 'react';

import { useStyles } from './hooks/useStyles';
import useGetUser from 'app/hooks/user/get';

const AppBar: React.FC = () => {
    const styles = useStyles();
    const user = useGetUser();

    return (
        <Fragment>
            <MUIAppBar position="static" sx={styles.appBar}>
                <Typography variant="subtitle1">
                    {user ? `Welcome, ${user.name}!` : 'You are not logged in.'}
                </Typography>
            </MUIAppBar>

            <Outlet />
        </Fragment>
    );
};

export default AppBar;
