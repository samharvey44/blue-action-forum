import React, { Fragment, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
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
import useGetAuthedUser from 'app/hooks/getAuthedUser';

const AppContainer: React.FC = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();

    const authedUser = useGetAuthedUser();
    const styles = useStyles();
    const theme = useTheme();

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
                    <Box
                        src="images/collective-banner.jpg"
                        alt="Collective 6 logo"
                        sx={styles.bannerImage}
                        component="img"
                    />

                    <Avatar
                        sx={styles.profilePicture}
                        onClick={(e) => {
                            setProfilePictureDropdownAnchor(e.currentTarget);
                        }}
                        src={
                            authedUser?.profile?.profilePicture?.url ??
                            undefined
                        }
                        alt="Profile picture and clickable menu"
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
