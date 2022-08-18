import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () => {
    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return useMakeStyles({
        rootGrid: {
            padding: '20px',
        },

        loginPaper: {
            padding: '20px',
            marginTop: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMd ? 'auto' : '35vw',
            textAlign: 'center',
        },

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
    });
};
