import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () => {
    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return useMakeStyles({
        outerCenterContainer: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        centerContainer: {
            padding: '20px',
            marginTop: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: isMd ? 'auto' : '65vw',
            textAlign: 'center',
        },
    });
};
