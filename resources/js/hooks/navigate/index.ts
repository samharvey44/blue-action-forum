import { useNavigate as useNativeNavigate } from 'react-router-dom';

import { EPages } from 'app/pages/enums';
import { useCallback } from 'react';
import { pages } from 'app/pages';

export default function useNavigate() {
    const navigate = useNativeNavigate();

    return useCallback(
        (pageName: EPages) => {
            const page = pages.find(({ name }) => name === pageName);

            if (!page) return;

            navigate({ pathname: page.path }, { replace: true });
        },
        [navigate],
    );
}
