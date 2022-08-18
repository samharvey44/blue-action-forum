import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/system/createTheme/createTheme';

export interface IStyles {
    [name: string]: SxProps<Theme>;
}

export interface IMeta {
    current_page: number;
    total: number;
    last_page: number;
}
