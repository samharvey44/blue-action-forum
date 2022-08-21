import React from 'react';

import useHandleInertiaMessages from 'app/hooks/request/handleInertiaMessages';
import AppContainer from 'app/components/layout/AppContainer';
import AuthedContainer from '../components/AuthedContainer';

const Home: React.FC = () => {
    useHandleInertiaMessages();

    return (
        <AppContainer>
            <AuthedContainer>
                <p>Home</p>
            </AuthedContainer>
        </AppContainer>
    );
};

export default Home;
