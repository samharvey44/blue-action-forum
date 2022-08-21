import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () =>
    useMakeStyles({
        appLogo: {
            height: '170px',
            width: '170px',
            marginBottom: '20px',
        },

        collectiveSubtitle: {
            marginTop: '10px',
            width: '70%',
            textAlign: 'center',
        },

        collectiveSubtitle2: {
            width: '70%',
            textAlign: 'center',
        },

        emailField: {
            marginTop: '40px',
            width: '100%',
        },

        passwordField: {
            marginTop: '20px',
            width: '100%',
        },

        signupButtonContainer: {
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },

        loginContainer: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
        },

        loginText: {
            marginLeft: 'auto',
        },

        loginTextLink: {
            color: PRIMARY,
            cursor: 'pointer',
        },

        signupButton: {
            marginLeft: 'auto',
        },

        loginTextLinkExt: {
            textDecoration: 'none',
        },
    });
