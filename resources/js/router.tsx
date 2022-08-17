import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { authedPages, unauthedPages } from './pages';
import AppBar from 'app/components/layout/AppBar';
import useGetUser from 'app/hooks/user/get';

const Router: React.FC = () => {
    const user = useGetUser();

    let pages = !!user ? authedPages : unauthedPages;

    if (user) {
        pages = pages.filter((page) =>
            page.roles.length > 0
                ? page.roles.find((role) => role === user.role.name)
                : true,
        );
    }

    const getRedirectProps = useCallback(
        (matchAll: boolean): Parameters<typeof Route>[0] => ({
            path: matchAll ? '*' : '/',
            element: <Navigate replace to={!!user ? '/home' : '/login'} />,
        }),
        [user],
    );

    return (
        <BrowserRouter>
            <Routes>
                <Route {...getRedirectProps(false)} />

                <Route path="/" element={<AppBar />}>
                    {pages.map(({ path, Element }) => (
                        <Route key={path} path={path} element={<Element />} />
                    ))}
                </Route>

                <Route {...getRedirectProps(true)} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
