import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () =>
    useMakeStyles({
        paper: {
            padding: '20px',
            textAlign: 'center',
            width: '100%',
        },

        fieldsContainer: {
            marginTop: '20px',
            marginLeft: '40px',
            marginRight: '40px',
        },

        formField: {
            width: '100%',
        },

        gridItem: {
            display: 'flex',
            justifyContent: 'flex-start',
        },

        gridItemCentered: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },

        submitContainer: {
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'flex-end',
        },

        profilePicturePreview: {
            height: '140px',
            width: '140px',
            cursor: 'pointer',
        },

        hiddenImageUpload: {
            display: 'none',
        },

        profilePictureText: {
            color: PRIMARY,
            marginTop: '10px',
            cursor: 'pointer',
        },
    });
