import { usePage } from '@inertiajs/inertia-react';
import { useMemo } from 'react';

import { IUser, IInertiaProps } from 'app/interfaces';

export default function useGetAuthedUser() {
    const { props }: IInertiaProps = usePage();

    return useMemo(() => props.auth.user as IUser | null, [props]);
}
