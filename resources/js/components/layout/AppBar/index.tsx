import Typography from '@mui/material/Typography';
import MUIAppBar from '@mui/material/AppBar';
import React, { Fragment } from 'react';

import { useStyles } from './hooks/useStyles';

const AppBar: React.FC = () => {
    const styles = useStyles();

    return (
        <Fragment>
            <MUIAppBar position="static" sx={styles.appBar}>
                <Typography variant="subtitle1"></Typography>
            </MUIAppBar>
        </Fragment>
    );
};

export default AppBar;
