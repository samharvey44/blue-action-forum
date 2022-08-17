import { useMemo } from 'react';

export default function useGetTimeOfDay() {
    return useMemo(() => {
        const hours = new Date().getHours();

        if (hours < 12) return 'morning';
        if (hours < 18) return 'afternoon';

        return 'evening';
    }, []);
}
