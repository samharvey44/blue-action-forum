import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () =>
    useMakeStyles({
        paper: {
            padding: '20px',
            textAlign: 'center',
            width: '100%',
        },

        profileTitleContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        profilePicture: {
            border: `3px solid ${PRIMARY}`,
            height: '130px',
            width: '130px',
            marginBottom: '10px',
        },

        detailsGrid: {
            marginTop: '10px',
        },

        bio: {
            width: '65%',
        },

        bioMobile: {
            width: '100%',
        },

        profileAreaHeader: {
            marginBottom: '10px',
        },
    });
