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

        passwordField: {
            marginTop: '20px',
            width: '100%',
        },

        loginButtonContainer: {
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },

        signupContainer: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
        },

        signupText: {
            marginLeft: 'auto',
        },

        signupTextLink: {
            color: PRIMARY,
            cursor: 'pointer',
        },

        loginButton: {
            marginLeft: 'auto',
        },

        rememberMeContainer: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '5px',
            width: '100%',
        },

        rememberMeCheckbox: {
            marginLeft: 'auto',
        },

        signupTextLinkExt: {
            textDecoration: 'none',
        },
    });
