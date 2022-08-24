import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () =>
    useMakeStyles({
        paper: {
            padding: '20px',
            textAlign: 'center',
            width: '100%',
        },
    });
