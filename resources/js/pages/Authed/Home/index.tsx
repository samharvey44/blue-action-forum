import React from 'react';

import AppContainer from 'app/components/layout/AppContainer';
import AuthedContainer from '../components/AuthedContainer';

const Home: React.FC = () => {
    return (
        <AppContainer>
            <AuthedContainer>
                <p>Home</p>
            </AuthedContainer>
        </AppContainer>
    );
};

export default Home;
