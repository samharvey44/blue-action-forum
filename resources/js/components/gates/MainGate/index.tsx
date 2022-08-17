import React from 'react';

import LoadRolesGate from '../LoadRolesGate';
import { IProps } from './interfaces';
import AuthGate from '../AuthGate';

const MainGate: React.FC<IProps> = ({ children }) => (
    <AuthGate>
        {(authReady) => (
            <LoadRolesGate>
                {(rolesReady) => children(rolesReady && authReady)}
            </LoadRolesGate>
        )}
    </AuthGate>
);

export default MainGate;
