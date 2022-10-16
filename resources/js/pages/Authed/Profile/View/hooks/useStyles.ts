import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY, WARNING_RED } from 'app/globals/colors';

export const useStyles = () =>
    useMakeStyles({
        paper: {
            padding: '20px',
            textAlign: 'center',
            width: '100%',
        },

        centerContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },

        bioText: {
            wordWrap: 'break-word',
        },

        profilePicture: {
            border: `3px solid ${PRIMARY}`,
            height: '130px',
            width: '130px',
            marginBottom: '20px',
        },

        profileAreaHeader: {
            marginBottom: '10px',
        },

        primaryText: {
            color: PRIMARY,
        },

        endAlignContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },

        actionIcon: {
            cursor: 'pointer',
            color: PRIMARY,
            marginLeft: '10px',
        },

        reportIconReported: {
            cursor: 'pointer',
            color: WARNING_RED,
            marginLeft: '10px',
        },

        editIcon: {
            color: PRIMARY,
            cursor: 'pointer',
        },

        bioContainer: {
            marginTop: '20px',
        },
    });
