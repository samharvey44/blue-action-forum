import React from 'react';

export interface IProps {
    dataLoading: boolean;
    setDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
