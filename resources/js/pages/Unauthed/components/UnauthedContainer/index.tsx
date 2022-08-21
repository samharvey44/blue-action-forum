import { Grid, Paper, Grow } from '@mui/material';
import React from 'react';

import { useStyles } from './hooks/useStyles';

const UnauthedContainer: React.FC = ({ children }) => {
    const styles = useStyles();

    return (
        <Grow in>
            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={3}
                sx={styles.rootGrid}
            >
                <Grid item xs={12}>
                    <Paper sx={styles.paper}>{children}</Paper>
                </Grid>
            </Grid>
        </Grow>
    );
};

export default UnauthedContainer;
