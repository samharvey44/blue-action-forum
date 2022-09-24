import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const PaginationContainer: React.FC<IProps> = ({
    threads,
    handleGetThreads,
    filter,
    search,
}) => {
    const styles = useStyles();

    return (
        <Box sx={styles.paginationContainer}>
            <Typography variant="subtitle1">{`Viewing page ${
                threads?.meta.current_page ?? '1'
            } of ${threads?.meta.last_page ?? '1'}`}</Typography>

            <Box sx={styles.buttonsContainer}>
                <Button
                    onClick={() => {
                        handleGetThreads(
                            (threads?.meta.current_page ?? 1) - 1,
                            filter,
                            search,
                        );
                    }}
                    disabled={(threads?.meta.current_page ?? 1) === 1}
                    sx={styles.paginationButton}
                    startIcon={<ArrowBack />}
                    variant="contained"
                >
                    Previous
                </Button>

                <Button
                    onClick={() => {
                        handleGetThreads(
                            (threads?.meta.current_page ?? 1) + 1,
                            filter,
                            search,
                        );
                    }}
                    disabled={
                        (threads?.meta.current_page ?? 1) ===
                        (threads?.meta.last_page ?? 1)
                    }
                    sx={styles.paginationButton}
                    endIcon={<ArrowForward />}
                    variant="contained"
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default PaginationContainer;
