import { useMediaQuery, useTheme } from '@mui/material';

import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () => {
    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return useMakeStyles({
        appLogo: {
            height: '170px',
            width: '170px',
            marginBottom: '20px',
        },

        emailField: {
            marginTop: '40px',
            width: '100%',
        },

        resetButtonContainer: {
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },

        sendButton: {
            marginLeft: 'auto',
        },

        passwordField: {
            marginTop: '20px',
            width: '100%',
        },

        form: {
            width: isMd ? '100%' : '60%',
        },

        paper: {
            padding: '20px',
            textAlign: 'center',
            width: '100%',
        },

        appLogoContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        formContainer: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
};
