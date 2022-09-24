import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () => {
    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return useMakeStyles({
        threadPaper: {
            padding: '20px',
        },

        innerThreadContainer: {
            display: 'flex',
            justifyContent: !isMd ? 'flex-end' : 'flex-start',
        },

        innerThreadContainerRightAlign: {
            display: 'flex',
            justifyContent: 'flex-end',
        },

        createdAtText: {
            opacity: 0.6,
        },

        threadContentContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
        },

        categoriesContainer: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        },

        category: {
            marginRight: '10px',
        },

        threadLink: {
            textDecoration: 'none',
        },
    });
};
