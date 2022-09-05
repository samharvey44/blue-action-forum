import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () => {
    return useMakeStyles({
        appBar: {
            backgroundColor: 'white',
            boxShadow: '0px 0px 15px 9px rgba(0,0,0,0.1)',
        },

        bannerImage: {
            height: '100px',
            width: '260px',
            opacity: 0.4,
        },

        innerAppBar: {
            display: 'flex',
            alignItems: 'center',
        },

        profilePicture: {
            height: '80px',
            width: '80px',
            marginLeft: 'auto',
            marginRight: '10px',
            cursor: 'pointer',
            border: `3px solid ${PRIMARY}`,
        },

        footer: {
            marginTop: 'auto',
            width: '100%',
            bottom: 0,
            left: 0,
            backgroundColor: 'white',
            position: 'fixed',
            padding: '20px',
            boxShadow: '0px 0px 15px 9px rgba(0,0,0,0.1)',
        },

        innerFooterContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },

        linkedinLink: {
            color: PRIMARY,
            cursor: 'pointer',
            textDecoration: 'none',
        },
    });
};
