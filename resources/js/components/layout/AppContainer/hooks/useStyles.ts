import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () => {
    return useMakeStyles({
        appBar: {
            backgroundColor: 'white',
        },

        bannerImage: {
            height: '100px',
            width: '280px',
            opacity: 0.4,
            borderRight: '2px solid black',
        },
    });
};
