import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () =>
    useMakeStyles({
        errorContainer: {
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '200px',
            textAlign: 'center',
            flexDirection: 'column',
            padding: '20px',
        },

        appLogo: {
            height: '170px',
            width: '170px',
            marginBottom: '20px',
        },

        returnButton: {
            marginTop: '30px',
        },
    });
