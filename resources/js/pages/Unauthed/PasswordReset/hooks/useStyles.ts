import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () =>
    useMakeStyles({
        appLogo: {
            height: '170px',
            width: '170px',
            marginBottom: '20px',
        },

        emailField: {
            marginTop: '40px',
            width: '100%',
        },

        sendButtonContainer: {
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },

        sendButton: {
            marginLeft: 'auto',
        },

        textLink: {
            color: PRIMARY,
            cursor: 'pointer',
        },

        textLinkExt: {
            textDecoration: 'none',
            marginLeft: 'auto',
            marginTop: '10px',
        },
    });
