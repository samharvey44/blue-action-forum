import { usePage } from '@inertiajs/inertia-react';
import { Chip, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import { IInertiaProps } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';
import { Circle } from '@mui/icons-material';
import CommentsMap from './components/CommentsMap';

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

                    <Box sx={styles.outerCategoriesMapContainer}>
                        <Box sx={styles.categoriesMapContainer}>
                            {thread.categories.map(
                                ({ id, name, displayColor }) => (
                                    <Chip
                                        icon={
                                            <Circle
                                                sx={{
                                                    color: `${displayColor} !important`,
                                                }}
                                            />
                                        }
                                        sx={styles.category}
                                        variant="filled"
                                        label={name}
                                        key={id}
                                    />
                                ),
                            )}
                        </Box>
                    </Box>
                </Paper>

                <Box sx={styles.commentsMapContainer}>
                    {<CommentsMap comments={thread.comments ?? []} />}
                </Box>
            </AuthedContainer>
        </AppContainer>
    );
};

export default ViewThread;
