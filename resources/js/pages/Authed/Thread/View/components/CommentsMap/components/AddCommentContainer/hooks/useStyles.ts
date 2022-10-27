import { useMediaQuery, useTheme } from '@mui/material';

import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () => {
    const theme = useTheme();

    const isLg = useMediaQuery(theme.breakpoints.down('lg'));

    return useMakeStyles({
        paper: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '20px',
            textAlign: 'center',
            width: '100%',
        },

        commentFormContainer: {
            width: isLg ? '80%' : '60%',
        },

        commentField: {
            marginTop: '10px',
            marginBottom: '10px',
            width: '100%',
        },

        endAlignContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
            width: '100%',
            marginTop: '10px',
        },

        createButton: {
            marginLeft: '10px',
            marginTop: isLg ? '5px' : 'auto',
        },

        uploadButton: {
            marginTop: isLg ? '5px' : 'auto',
        },

        hiddenImageUpload: {
            display: 'none',
        },

        uploadedImageContainer: {
            position: 'relative',
            marginRight: '20px',
            marginTop: isLg ? '10px' : 'auto',
        },

        uploadedImageContainerEnd: {
            position: 'relative',
            marginTop: isLg ? '10px' : 'auto',
        },

        badge: {
            position: 'absolute',
            right: 0,
            top: '-15px',
            backgroundColor: PRIMARY,
            borderRadius: '50%',
            padding: '5px',
            cursor: 'pointer',
        },

        uploadedFile: {
            maxWidth: '120px',
            maxHeight: '120px',
        },

        deleteIcon: {
            color: 'white',
        },

        imageUploadsInfoContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '10px',
            marginBottom: '10px',
        },

        replyingToText: {
            color: PRIMARY,
            fontWeight: 'bold',
        },

        replyingToHeaderContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        },

        replyingToClearIcon: {
            color: PRIMARY,
            marginLeft: '10px',
            cursor: 'pointer',
        },
    });
};
