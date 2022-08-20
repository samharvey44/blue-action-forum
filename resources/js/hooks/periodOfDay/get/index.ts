import { useMemo } from 'react';

export default function useGetPeriodOfDay() {
    return useMemo(() => {
        const hours = new Date().getHours();

        if (hours < 12) return 'morning';
        if (hours < 18) return 'afternoon';

        return 'evening';
    }, []);
}
