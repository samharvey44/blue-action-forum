import { useMediaQuery, useTheme } from '@mui/material';

import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () => {
    const theme = useTheme();

    const isLg = useMediaQuery(theme.breakpoints.down('lg'));

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

        endAlignContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
        },

        createButton: {
            marginLeft: '10px',
            marginTop: isLg ? '5px' : 'auto',
        },

        hiddenImageUpload: {
            display: 'none',
        },

        uploadedFile: {
            maxWidth: '120px',
            maxHeight: '120px',
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

        imageUploadsInfoContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: '10px',
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

        deleteIcon: {
            color: 'white',
        },

        categoriesContainer: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        },

        category: {
            marginRight: '10px',
            marginTop: '5px',
        },

        categoryHeader: {
            textAlign: 'left',
            marginBottom: '10px',
        },

        categorySubHeader: {
            textAlign: 'left',
            marginTop: '10px',
        },

        uploadButton: {
            marginTop: isLg ? '5px' : 'auto',
        },
    });
};
