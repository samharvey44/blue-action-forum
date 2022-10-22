import { useCallback } from 'react';

import useGetAuthedUser from 'app/hooks/getAuthedUser';

export default function useHandleLogoutSuspended() {
    const user = useGetAuthedUser();

    return useCallback(() => {
        // If we've sent an AJAX request, we won't be able to redirect
        // a suspended user server-side. Instead, we'll check if the
        // user (which is returned with every request) is suspended, and
        // perform a client-side redirect if they are.
        if (user?.isSuspended) {
            window.location.replace('/');
        }
    }, [user?.isSuspended]);
}
