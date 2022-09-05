import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () => {
    return useMakeStyles({
        titlePaper: {
            padding: '20px',
            textAlign: 'center',
            width: '100%',
        },
    });
};
