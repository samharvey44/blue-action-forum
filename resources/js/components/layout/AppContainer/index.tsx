import { Logout, Person } from '@mui/icons-material';
import React, { Fragment, useState } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import AppBar from '@mui/material/AppBar';
import { useSnackbar } from 'notistack';
import {
    ListItemIcon,
    ListItemText,
    MenuItem,
    Avatar,
    Menu,
    Box,
    Typography,
} from '@mui/material';

import useGetAuthedUser from 'app/hooks/getAuthedUser';
import { linkedInLink } from 'app/globals/config';
import { useStyles } from './hooks/useStyles';

const AppContainer: React.FC = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();

    const authedUser = useGetAuthedUser();
    const styles = useStyles();

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
            <Box sx={styles.bodyContainer}>
                <AppBar position="static" sx={styles.appBar}>
                    <Box sx={styles.innerAppBar}>
                        <Link href={authedUser ? '/home' : '/login'}>
                            <Box
                                src="/images/collective-banner.jpg"
                                alt="Collective 6 logo"
                                sx={styles.bannerImage}
                                component="img"
                            />
                        </Link>

                        <Avatar
                            sx={styles.profilePicture}
                            onClick={(e) => {
                                setProfilePictureDropdownAnchor(
                                    e.currentTarget,
                                );
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
                            {authedUser && authedUser.profile && (
                                <Link
                                    href={`/profiles/${authedUser.profile.id}`}
                                    style={styles.menuItemLink}
                                >
                                    <MenuItem>
                                        <ListItemIcon>
                                            <Person fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>My Profile</ListItemText>
                                    </MenuItem>
                                </Link>
                            )}

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

                <Box sx={styles.footer}>
                    <Box sx={styles.innerFooterContainer}>
                        <Typography variant="subtitle1">
                            Created by{' '}
                            <a
                                style={styles.linkedinLink}
                                rel="noopener noreferrer"
                                href={linkedInLink}
                                target="_blank"
                            >
                                Sam Harvey
                            </a>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
};

export default AppContainer;
