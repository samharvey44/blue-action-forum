import useMakeStyles from 'app/hooks/makeStyles';
import { PRIMARY } from 'app/globals/colors';

export const useStyles = () => {
    return useMakeStyles({
        paginationContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },

        buttonsContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },

        paginationButton: {
            margin: '10px',
        },
    });
};
