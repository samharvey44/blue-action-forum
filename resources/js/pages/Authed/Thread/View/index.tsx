import { Chip, Paper, Typography } from '@mui/material';
import { usePage } from '@inertiajs/inertia-react';
import { Circle } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import moment from 'moment';

import AuthedContainer from '../../components/AuthedContainer';
import AppContainer from 'app/components/layout/AppContainer';
import CommentsMap from './components/CommentsMap';
import { IInertiaProps } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const ViewThread: React.FC = () => {
    const {
        props: { thread, reactions, comments },
    } = usePage<IInertiaProps & IProps>();

    const styles = useStyles();

    useEffect(() => {
        // Allow the 'Grow' animation to occur and page length be fully
        // defined before scrolling to the top of the page.
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    }, []);

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
                    {
                        <CommentsMap
                            threadId={thread.id}
                            reactions={reactions}
                            comments={comments}
                        />
                    }
                </Box>
            </AuthedContainer>
        </AppContainer>
    );
};

export default ViewThread;
