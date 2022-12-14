import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

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
            alignItems: 'center',
        },

        categoriesContainer: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        },

        category: {
            marginRight: '10px',
            marginTop: '5px',
        },

        threadLink: {
            textDecoration: 'none',
        },

        unreadContainer: {
            height: '25px',
            width: '25px',
            backgroundColor: PRIMARY,
            borderRadius: '50%',
            marginRight: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
        },

        unreadIcon: {
            color: 'white',
            height: '18px',
            width: '18px',
        },

        statusesContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginLeft: '20px',
        },

        profileLinkText: {
            color: PRIMARY,
            textDecoration: 'none',
            cursor: 'pointer',
        },
    });
};
