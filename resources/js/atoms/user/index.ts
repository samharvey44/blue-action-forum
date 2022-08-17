import { atom } from 'recoil';

export default atom<number | null>({
    key: 'userAtom',
    default: null,
});
