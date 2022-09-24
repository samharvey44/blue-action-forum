import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () =>
    useMakeStyles({
        paginationContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },

        buttonsContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        paginationButton: {
            margin: '10px',
        },
    });
