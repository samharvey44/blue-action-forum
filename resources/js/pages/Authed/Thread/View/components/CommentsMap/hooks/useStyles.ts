import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () => {
    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return useMakeStyles({
        commentContainer: {
            marginBottom: '10px',
        },

        userPaper: {
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100%',
        },

        contentPaper: {
            padding: '10px',
            height: '100%',
        },

        profilePicture: {
            height: '80px',
            width: '80px',
            border: `3px solid ${PRIMARY}`,
        },

        profilePictureContainer: {
            position: 'relative',
        },

        creatorBadge: {
            position: 'absolute',
            right: 0,
            top: '-15px',
            backgroundColor: PRIMARY,
            borderRadius: '50%',
            padding: '5px',
        },

        creatorIcon: {
            color: 'white',
        },

        roleText: {
            color: PRIMARY,
        },

        grid: {
            display: 'flex',
        },

        contentInnerContainer: {
            alignItems: 'flex-start',
            flexDirection: 'column',
            display: 'flex',
            padding: '5px',
        },

        commentMetaContainer: {
            display: 'flex',
            alignItems: 'center',
        },

        postedAtText: {
            opacity: 0.6,
        },

        commentContent: {
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            marginTop: '10px',
            textAlign: 'left',
            width: '100%',
        },

        profileMdContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
        },

        profilePictureMd: {
            height: '50px',
            width: '50px',
            border: `2px solid ${PRIMARY}`,
        },

        profileText: {
            marginLeft: '10px',
        },

        profileMetaContainer: {
            display: 'flex',
            alignItems: 'center',
        },

        divider: {
            marginTop: '20px',
            marginBottom: '20px',
            width: '100%',
            color: 'black',
            opacity: 0.1,
            border: '1px solid black',
        },

        commentImagesContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
        },

        commentImage: {
            cursor: 'pointer',
            marginRight: '10px',
            height: '80px',
            width: '80px',
            objectFit: 'contain',
        },

        commentImageEnd: {
            cursor: 'pointer',
            width: '40px',
            objectFit: 'contain',
        },

        reactionsMapContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },

        reactionIcon: {
            height: '30px',
            width: '30px',
            marginBottom: '5px',
            cursor: 'pointer',
        },

        reactionAndCountContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '5px',
        },

        reactionActive: {
            cursor: 'pointer',
        },

        reactionActiveUserLeft: {
            cursor: 'pointer',
            color: PRIMARY,
            fontWeight: 'bold',
        },

        addCommentGridItem: {
            marginTop: isMd ? '60px' : undefined,
        },
    });
};
