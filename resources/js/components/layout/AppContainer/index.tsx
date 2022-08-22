import React, { Fragment, useState } from 'react';
import { Logout } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import { useSnackbar } from 'notistack';
import {
    useMediaQuery,
    ListItemIcon,
    ListItemText,
    useTheme,
    MenuItem,
    Avatar,
    Menu,
    Box,
} from '@mui/material';

import { useStyles } from './hooks/useStyles';
import { Inertia } from '@inertiajs/inertia';

const AppContainer: React.FC = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const styles = useStyles();
    const theme = useTheme();

    const isLg = useMediaQuery(theme.breakpoints.down('lg'));

    const [profilePictureDropdownAnchor, setProfilePictureDropdownAnchor] =
        useState<HTMLDivElement | null>(null);

    const handleLogout = () => {
        Inertia.post('/logout', undefined, {
            onSuccess: () => {
                enqueueSnackbar('Logged out successfully.', {
                    variant: 'success',
                });
            },
        });
    };

    return (
        <Fragment>
            <AppBar position="static" sx={styles.appBar}>
                <Box sx={styles.innerAppBar}>
                    {!isLg && (
                        <Box
                            src="images/collective-banner.jpg"
                            alt="The Collective logo"
                            sx={styles.bannerImage}
                            component="img"
                        />
                    )}

                    <Avatar
                        sx={styles.profilePicture}
                        onClick={(e) => {
                            setProfilePictureDropdownAnchor(e.currentTarget);
                        }}
                    />

                    <Menu
                        anchorEl={profilePictureDropdownAnchor}
                        open={!!profilePictureDropdownAnchor}
                        onClose={() => {
                            setProfilePictureDropdownAnchor(null);
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                handleLogout();
                            }}
                        >
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </AppBar>

            {children}
        </Fragment>
    );
};

export default AppContainer;
