import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () =>
    useMakeStyles({
        titlePaper: {
            padding: '20px',
            textAlign: 'center',
            width: '100%',
        },

        categoriesMapContainer: {
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '60%',
        },

        category: {
            marginRight: '10px',
        },

        outerCategoriesMapContainer: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
        },

        commentsMapContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '20px',
            display: 'flex',
            width: '100%',
        },

        actionsContainer: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
        },

        lockIcon: {
            marginRight: '10px',
            color: PRIMARY,
            height: '30px',
            width: '30px',
            cursor: 'pointer',
        },

        lockIconNointeraction: {
            marginRight: '10px',
            color: PRIMARY,
            height: '30px',
            width: '30px',
        },

        pinIcon: {
            color: PRIMARY,
            cursor: 'pointer',
            height: '30px',
            width: '30px',
            marginRight: '10px',
        },

        pinIconPinnedNointeraction: {
            color: PRIMARY,
            height: '30px',
            width: '30px',
            marginRight: '10px',
        },

        subscriptionIcon: {
            color: PRIMARY,
            cursor: 'pointer',
            height: '30px',
            width: '30px',
        },
    });
