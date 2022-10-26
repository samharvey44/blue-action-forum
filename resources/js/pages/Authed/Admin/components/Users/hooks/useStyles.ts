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

        loadingText: {
            marginTop: '10px',
        },

        searchContainer: {
            display: 'flex',
            alignItems: 'center',
            height: '100%',
        },

        searchField: {
            width: '100%',
        },

        searchButton: {
            marginLeft: 'auto',
        },

        clearButton: {
            marginLeft: '10px',
        },
    });
