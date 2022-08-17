import { matchPath, useLocation } from 'react-router-dom';

import { pages } from 'app/pages';

export default function usePage() {
    const location = useLocation();

    const page =
        pages.find((p) => !!matchPath(location.pathname, p.path)) || null;

    if (!page) {
        throw new Error(
            `Failed to find page matching current route \`${location.pathname}\``,
        );
    }

    return page;
}
