import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

import { IPaginatedReports } from 'app/interfaces';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const Reports: React.FC<IProps> = ({ dataLoading, setDataLoading }) => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();

    const [reports, setReports] = useState<IPaginatedReports | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const [processedFilter, setProcessedFilter] = useState<null | boolean>(
        null,
    );

    const TableHeaderCell: React.FC = ({ children }) =>
        useMemo(
            () => (
                <TableCell sx={styles.tableHeader} align="center">
                    {children}
                </TableCell>
            ),
            [children],
        );

    const headers = [
        'Report ID',
        'Reported At',
        'Report Type',
        'Processed',
        'Link to Report',
    ];

    const getReports = useCallback(() => {
        setDataLoading(true);

        axios
            .get('/admin/reports', {
                params: {
                    page: currentPage,
                    processedFilter,
                    rowsPerPage,
                },
            })
            .then(({ data }: { data: IPaginatedReports }) => {
                setReports(data);
            })
            .catch(() => {
                enqueueSnackbar('Failed to get reports.', { variant: 'error' });
            })
            .finally(() => {
                setDataLoading(false);
            });
    }, [
        currentPage,
        enqueueSnackbar,
        processedFilter,
        rowsPerPage,
        setDataLoading,
    ]);

    useEffect(() => {
        getReports();
    }, [getReports]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {dataLoading ? (
                    <Box sx={styles.loadingContainer}>
                        <CircularProgress color="primary" />

                        <Typography variant="h6" sx={styles.loadingText}>
                            Reports loading...
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

                            {reports?.data && (
                                <TableBody>
                                    {reports.data.map((report) => (
                                        <TableRow key={report.id}>
                                            <TableCell align="center">
                                                {report.id}
                                            </TableCell>
                                            <TableCell align="center">
                                                {moment
                                                    .utc(report.createdAt)
                                                    .local()
                                                    .format(
                                                        'DD/MM/YYYY [at] HH:mm',
                                                    )}
                                            </TableCell>
                                            <TableCell align="center">
                                                {report.reportType}
                                            </TableCell>
                                            <TableCell align="center">
                                                {report.isProcessed
                                                    ? 'Yes'
                                                    : 'No'}
                                            </TableCell>
                                            <TableCell align="center">
                                                {report.url}
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
                                        count={reports?.meta.total ?? 0}
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

export default Reports;
