import { usePage } from '@inertiajs/inertia-react';
import { useMemo } from 'react';

import { IAuthedUser } from 'app/interfaces';

export default function useGetAuthedUser() {
    const { props }: { [key: string]: any } = usePage();

    return useMemo(() => props.auth.user.data as IAuthedUser, [props]);
}
