import useMakeStyles from 'app/hooks/makeStyles';

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
    });
