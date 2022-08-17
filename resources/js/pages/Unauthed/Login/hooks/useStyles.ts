import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

import useMakeStyles from 'app/hooks/makeStyles';

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
            width: isMd ? 'auto' : '30vw',
        },

        appLogo: {
            height: '150px',
            width: '150px',
            marginBottom: '20px',
        },

        emailField: {
            marginTop: '20px',
            width: '100%',
        },

        passwordField: {
            marginTop: '10px',
            width: '100%',
        },

        loginButtonContainer: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
};
