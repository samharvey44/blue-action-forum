import { usePage } from '@inertiajs/inertia-react';
import { Paper, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import { IInertiaProps } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const ViewThread: React.FC = () => {
    const {
        props: { thread },
    } = usePage<IInertiaProps & IProps>();

    const styles = useStyles();

    return (
        <AppContainer>
            <AuthedContainer withBackButton>
                <Paper sx={styles.titlePaper}>
                    <Typography variant="h3">{thread.title}</Typography>

                    <Typography variant="subtitle1">
                        Thread created{' '}
                        <b>
                            {moment
                                .utc(thread.createdAt)
                                .local()
                                .format('DD/MM/YYYY [at] HH:mm')}
                        </b>{' '}
                        by <b>{thread.creator.profile?.username}</b>
                    </Typography>
                </Paper>
            </AuthedContainer>
        </AppContainer>
    );
};

export default ViewThread;
