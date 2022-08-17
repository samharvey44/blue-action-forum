import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { Theme } from '@mui/system/createTheme/createTheme';

import { useMemo } from 'react';

export default function useMakeStyles<T = Record<string, SxProps<Theme>>>(
    styles: T,
) {
    return useMemo(() => styles, [styles]);
}
