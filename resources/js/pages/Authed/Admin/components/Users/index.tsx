import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import React, { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import axios from 'axios';
import {
    Box,
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';

import { IPaginatedUsers } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const Users: React.FC<IProps> = ({ dataLoading, setDataLoading }) => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [users, setUsers] = useState<IPaginatedUsers | null>(null);

    const TableHeaderCell: React.FC = ({ children }) => (
        <TableCell sx={styles.tableHeader} align="center">
            {children}
        </TableCell>
    );

    const headers = [
        'User ID',
        'Email',
        'Signed up on',
        'Profile Created',
        'Username',
        'Last Seen',
        'Suspended',
        'User Role',
    ];

    const getUsers = useCallback(() => {
        setDataLoading(true);

        axios
            .get('/admin/users', {
                params: {
                    page: currentPage,
                    rowsPerPage,
                },
            })
            .then(({ data }: { data: IPaginatedUsers }) => {
                setUsers(data);
            })
            .catch(() => {
                enqueueSnackbar('Failed to get users.', { variant: 'error' });
            })
            .finally(() => {
                setDataLoading(false);
            });
    }, [currentPage, enqueueSnackbar, rowsPerPage, setDataLoading]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {dataLoading ? (
                    <Box sx={styles.loadingContainer}>
                        <CircularProgress color="primary" />

                        <Typography variant="h6" sx={styles.threadsLoadingText}>
                            Users loading...
                        </Typography>
                    </Box>
                ) : (
                    <Paper sx={styles.tableContainer} variant="outlined">
                        <Table sx={styles.table}>
                            <TableHead style={styles.tableHeaderContainer}>
                                <TableRow>
                                    {headers.map((val, index) => (
                                        <TableHeaderCell key={index}>
                                            {val}
                                        </TableHeaderCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            {users?.data && (
                                <TableBody>
                                    {users.data.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell align="center">
                                                {user.id}
                                            </TableCell>
                                            <TableCell align="center">
                                                {user.email}
                                            </TableCell>
                                            <TableCell align="center">
                                                {moment
                                                    .utc(user.createdAt)
                                                    .local()
                                                    .format(
                                                        'DD/MM/YYYY [at] HH:mm',
                                                    )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {user.profile ? 'Yes' : 'No'}
                                            </TableCell>
                                            <TableCell align="center">
                                                {user.profile ? (
                                                    <a
                                                        target="_blank"
                                                        href={`/profiles/${user.profile?.id}`}
                                                        style={styles.username}
                                                        rel="noopener noreferrer"
                                                    >
                                                        {user.profile.username}
                                                    </a>
                                                ) : (
                                                    'N/A'
                                                )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {user.lastSeen
                                                    ? moment
                                                          .utc(user.lastSeen)
                                                          .local()
                                                          .fromNow()
                                                    : 'Never'}
                                            </TableCell>
                                            <TableCell align="center">
                                                {user.isSuspended
                                                    ? 'Yes'
                                                    : 'No'}
                                            </TableCell>
                                            <TableCell align="center">
                                                {user.role.name}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )}
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 20, 40]}
                                        colSpan={headers.length}
                                        count={users?.meta.total ?? 0}
                                        rowsPerPage={rowsPerPage}
                                        // Note, the paging for the table starts at 0
                                        page={currentPage - 1}
                                        onPageChange={(event, newPage) => {
                                            setCurrentPage(newPage + 1);
                                        }}
                                        onRowsPerPageChange={(event) => {
                                            setRowsPerPage(
                                                parseInt(
                                                    event.target.value,
                                                    10,
                                                ),
                                            );

                                            setCurrentPage(1);
                                        }}
                                        ActionsComponent={
                                            TablePaginationActions
                                        }
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                )}
            </Grid>
        </Grid>
    );
};

export default Users;
