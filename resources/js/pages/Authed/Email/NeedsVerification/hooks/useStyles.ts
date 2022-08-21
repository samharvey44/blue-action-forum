import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () =>
    useMakeStyles({
        resendEmailContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '10px',
        },

        smallText: {
            fontSize: '13px',
        },

        resendEmailText: {
            cursor: 'pointer',
            color: PRIMARY,
            fontSize: '13px',
            textAlign: 'center',
        },

        verifyPaper: {
            padding: '20px',
            textAlign: 'center',
        },

        verifyTitle: {
            marginBottom: '20px',
        },
    });
