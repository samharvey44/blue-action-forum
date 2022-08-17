import { atom } from 'recoil';

import { INormalizedAtom } from '../interfaces';

export default atom<INormalizedAtom>({
    key: 'rolesAtom',
    default: {
        data: [],
        sentInitial: false,
    },
});
