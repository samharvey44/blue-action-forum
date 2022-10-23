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

        username: {
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

        threadsLoadingText: {
            marginTop: '10px',
        },
    });
