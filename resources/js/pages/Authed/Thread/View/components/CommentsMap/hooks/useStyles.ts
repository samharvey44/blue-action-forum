import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';

import { PRIMARY, WARNING_RED } from 'app/globals/colors';
import useMakeStyles from 'app/hooks/makeStyles';

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

        commentContentDeleted: {
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            marginTop: '10px',
            textAlign: 'left',
            width: '100%',
            color: WARNING_RED,
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

        commentActionsContainer: {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '100%',
        },

        commentActionsInnerContainer: {
            marginLeft: 'auto',
        },

        actionIcon: {
            marginLeft: '10px',
            cursor: 'pointer',
            color: PRIMARY,
        },

        reportIconReported: {
            marginLeft: '10px',
            cursor: 'pointer',
            color: WARNING_RED,
        },

        commentReportedIcon: {
            marginLeft: '10px',
            color: WARNING_RED,
        },

        actionIconNomargin: {
            cursor: 'pointer',
            color: PRIMARY,
        },

        replyingContainer: {
            backgroundColor: '#f5f6f7',
            padding: '10px',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            marginTop: '10px',
        },

        replyingToText: {
            fontWeight: 'bold',
            marginTop: '5px',
        },

        replyText: {
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
        },

        replyTextDeleted: {
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: WARNING_RED,
        },

        profileLink: {
            textDecoration: 'none',
            color: PRIMARY,
            cursor: 'pointer',
        },
    });
};
