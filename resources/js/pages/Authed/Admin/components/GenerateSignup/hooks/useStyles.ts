import { PRIMARY } from 'app/globals/colors';

import useMakeStyles from 'app/hooks/makeStyles';

export const useStyles = () =>
    useMakeStyles({
        centeredContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
        },

        generateButton: {
            marginTop: '20px',
        },

        signupLink: {
            fontStyle: 'italic',
            color: PRIMARY,
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            cursor: 'pointer',
        },

        signupLinkContainer: {
            marginTop: '20px',
            width: '80%',
        },
    });
