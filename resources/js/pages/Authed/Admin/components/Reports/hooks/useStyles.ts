import { PRIMARY } from 'app/globals/colors';

import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () =>
    useMakeStyles({
        table: {
            minWidth: '100%',
        },

        tableHeader: {
            color: 'white',
        },

        tableContainer: {
            overflowX: 'scroll',
        },

        tableHeaderContainer: {
            backgroundColor: PRIMARY,
        },

        url: {
            color: PRIMARY,
            cursor: 'pointer',
            textDecoration: 'none',
        },

        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },

        loadingText: {
            marginTop: '10px',
        },

        filterContainer: {
            display: 'flex',
            textAlign: 'left',
        },
    });
