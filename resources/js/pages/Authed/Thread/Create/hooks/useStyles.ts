import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () => {
    return useMakeStyles({
        createPaper: {
            padding: '20px',
            textAlign: 'center',
            width: '100%',
        },

        field: {
            width: '100%',
        },

        createGrid: {
            marginTop: '10px',
        },
    });
};
