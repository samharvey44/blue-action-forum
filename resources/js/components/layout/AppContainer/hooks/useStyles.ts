import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () => {
    return useMakeStyles({
        appBar: {
            backgroundColor: 'white',
            boxShadow: '0px 0px 15px 9px rgba(0,0,0,0.1)',
        },

        bannerImage: {
            height: '100px',
            width: '280px',
            opacity: 0.4,
        },
    });
};
