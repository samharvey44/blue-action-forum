import { Avatar, Grid, Paper, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageViewer from 'react-simple-image-viewer';
import { Box } from '@mui/system';
import moment from 'moment';
import React, { useState } from 'react';

import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';
import { IFile } from 'app/interfaces';

const CommentsMap: React.FC<IProps> = ({ comments }) => {
    const [viewingImage, setViewingImage] = useState<IFile | null>(null);

    const styles = useStyles();
    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid container spacing={3}>
            {comments.map(({ id, createdAt, content, creator, images }) => (
                <Grid item xs={12} key={id} sx={styles.commentContainer}>
                    <Grid container spacing={3}>
                        {!isMd && (
                            <Grid item md={3}>
                                <Paper sx={styles.userPaper}>
                                    <Avatar
                                        sx={styles.profilePicture}
                                        src={
                                            creator.profile?.profilePicture
                                                ?.url ?? undefined
                                        }
                                        alt="User's profile picture"
                                    />

                                    <Typography variant="h6">
                                        <b>{creator.profile?.username}</b>
                                    </Typography>

                                    <Typography variant="subtitle2">
                                        <b>Member since: </b>
                                        {moment
                                            .utc(creator.createdAt)
                                            .local()
                                            .format('DD/MM/YY')}
                                    </Typography>

                                    {creator.profile?.location && (
                                        <Typography variant="subtitle2">
                                            <b>Location: </b>
                                            {creator.profile?.location}
                                        </Typography>
                                    )}

                                    {creator.role.name !== 'User' && (
                                        <Typography
                                            variant="subtitle2"
                                            sx={styles.roleText}
                                        >
                                            {creator.role.name}
                                        </Typography>
                                    )}
                                </Paper>
                            </Grid>
                        )}

                        <Grid item xs={12} md={9}>
                            {isMd && (
                                <Box sx={styles.profileMdContainer}>
                                    <Avatar
                                        sx={styles.profilePictureMd}
                                        src={
                                            creator.profile?.profilePicture
                                                ?.url ?? undefined
                                        }
                                        alt="User's profile picture"
                                    />

                                    <Typography
                                        variant="subtitle1"
                                        style={styles.profileText}
                                    >
                                        {creator.profile?.username}
                                        {creator.role.name !== 'User' && (
                                            <span style={styles.roleText}>
                                                {' - '} {creator.role.name}
                                            </span>
                                        )}
                                    </Typography>
                                </Box>
                            )}

                            <Paper sx={styles.contentPaper}>
                                <Box sx={styles.contentInnerContainer}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={styles.postedAtText}
                                    >
                                        Posted{' '}
                                        {moment
                                            .utc(createdAt)
                                            .local()
                                            .format('DD/MM/YY [at] HH:mm')}
                                    </Typography>

                                    <Typography
                                        variant="subtitle1"
                                        sx={styles.commentContent}
                                    >
                                        {content}
                                    </Typography>

                                    <Box sx={styles.divider} />

                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={4}></Grid>

                                        <Grid item xs={12} md={8}>
                                            <Box
                                                sx={
                                                    styles.commentImagesContainer
                                                }
                                            >
                                                {images.map(
                                                    (image, index, self) => (
                                                        <Box
                                                            sx={
                                                                index ===
                                                                self.length - 1
                                                                    ? styles.commentImageEnd
                                                                    : styles.commentImage
                                                            }
                                                            component="img"
                                                            src={image.url}
                                                            key={image.id}
                                                            onClick={() => {
                                                                setViewingImage(
                                                                    image,
                                                                );
                                                            }}
                                                        />
                                                    ),
                                                )}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            ))}

            {viewingImage && (
                <ImageViewer
                    src={[viewingImage.url]}
                    currentIndex={0}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={() => {
                        setViewingImage(null);
                    }}
                />
            )}
        </Grid>
    );
};

export default CommentsMap;
