import { atom } from 'recoil';

import { INormalizedAtom } from '../interfaces';

export default atom<INormalizedAtom>({
    key: 'usersAtom',
    default: {
        data: [],
        sentInitial: false,
    },
});
