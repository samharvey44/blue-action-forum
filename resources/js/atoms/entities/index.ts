import { atom } from 'recoil';

import { IEntitiesAtom } from './interfaces';

export default atom<IEntitiesAtom>({
    key: 'entitiesAtom',
    default: {
        users: {},
        roles: {},
    },
});
