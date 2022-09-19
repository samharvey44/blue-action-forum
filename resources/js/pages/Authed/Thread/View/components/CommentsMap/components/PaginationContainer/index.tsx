import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Link } from '@inertiajs/inertia-react';
import { Box } from '@mui/system';
import React from 'react';

import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const PaginationContainer: React.FC<IProps> = ({
    disableBack,
    disableForward,
    comments,
    threadId,
}) => {
    const styles = useStyles();

    return (
        <Box sx={styles.paginationContainer}>
            <Typography variant="subtitle1">{`Viewing page ${comments.meta.current_page} of ${comments.meta.last_page}`}</Typography>

            <Box sx={styles.buttonsContainer}>
                {disableBack ? (
                    <Button
                        startIcon={<ArrowBack />}
                        disabled
                        variant="contained"
                        sx={styles.paginationButton}
                    >
                        Previous
                    </Button>
                ) : (
                    <Link
                        href={`/threads/${threadId}/${
                            comments.meta.current_page - 1
                        }`}
                        only={['comments']}
                    >
                        <Button
                            startIcon={<ArrowBack />}
                            variant="contained"
                            sx={styles.paginationButton}
                        >
                            Previous
                        </Button>
                    </Link>
                )}

                {disableForward ? (
                    <Button
                        endIcon={<ArrowForward />}
                        disabled
                        variant="contained"
                        sx={styles.paginationButton}
                    >
                        Next
                    </Button>
                ) : (
                    <Link
                        href={`/threads/${threadId}/${
                            comments.meta.current_page + 1
                        }`}
                        only={['comments']}
                    >
                        <Button
                            endIcon={<ArrowForward />}
                            variant="contained"
                            sx={styles.paginationButton}
                        >
                            Next
                        </Button>
                    </Link>
                )}
            </Box>
        </Box>
    );
};

export default PaginationContainer;
