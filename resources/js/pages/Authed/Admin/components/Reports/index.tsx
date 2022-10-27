import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import axios from 'axios';
import {
    Box,
    Checkbox,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
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

    const [processedFilter, setProcessedFilter] = useState<string | number>('');

    const TableHeaderCell: React.FC = ({ children }) =>
        useMemo(
            () => (
                <TableCell sx={styles.tableHeader} align="center">
                    {children}
                </TableCell>
            ),
            [children],
        );

    const headers = useMemo(
        () => [
            'Report ID',
            'Reported On',
            'Report Type',
            'Processed',
            'Link to Report',
        ],
        [],
    );

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

    const handleToggleProcessed = (reportId: number) => {
        setDataLoading(true);

        axios
            .patch(`/admin/reports/${reportId}`, {
                page: currentPage,
                processedFilter,
                rowsPerPage,
            })
            .then(({ data }: { data: IPaginatedReports }) => {
                setReports(data);
            })
            .catch(() => {
                enqueueSnackbar('Failed to toggle processed status!');
            })
            .finally(() => {
                setDataLoading(false);
            });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Box sx={styles.filterContainer}>
                    <FormControl fullWidth>
                        <InputLabel id="processedLabel">
                            Select a filter...
                        </InputLabel>

                        <Select
                            value={processedFilter}
                            labelId="processedLabel"
                            label="Select a filter..."
                            onChange={(e) => {
                                setProcessedFilter(e.target.value);
                            }}
                        >
                            <MenuItem value={''}>None</MenuItem>
                            <MenuItem value={0}>Unprocessed</MenuItem>
                            <MenuItem value={1}>Processed</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>

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
                                                <Checkbox
                                                    checked={report.isProcessed}
                                                    onChange={() => {
                                                        if (dataLoading) {
                                                            return;
                                                        }

                                                        handleToggleProcessed(
                                                            report.id,
                                                        );
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <a
                                                    target="_blank"
                                                    href={report.url}
                                                    style={styles.url}
                                                    rel="noopener noreferrer"
                                                >
                                                    {report.url}
                                                </a>
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
