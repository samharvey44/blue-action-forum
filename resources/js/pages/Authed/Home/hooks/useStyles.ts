import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () => {
    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return useMakeStyles({
        homePaper: {
            padding: '20px',
            textAlign: 'center',
            width: '100%',
        },

        paperInnerContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
        },

        startNewThreadContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            marginTop: isMd ? '10px' : '0px',
        },

        textContainer: {
            display: 'flex',
            flexDirection: 'column',
        },

        createThreadLink: {
            textDecoration: 'none',
        },
    });
};
