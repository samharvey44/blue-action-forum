import React from 'react';

import AppContainer from 'app/components/layout/AppContainer';
import AuthedContainer from '../components/AuthedContainer';

const Home: React.FC = () => {
    return (
        <AppContainer>
            <AuthedContainer></AuthedContainer>
        </AppContainer>
    );
};

export default Home;
