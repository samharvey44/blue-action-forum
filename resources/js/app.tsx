import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { render } from 'react-dom';
import React from 'react';

import Main from './main';

InertiaProgress.init();

createInertiaApp({
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        render(
            <Main>
                <App {...props} />
            </Main>,
            el,
        );
    },
});
