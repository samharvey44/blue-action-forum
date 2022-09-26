import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useCallback, useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import { Inertia } from '@inertiajs/inertia';
import { Edit } from '@mui/icons-material';
import { Box } from '@mui/system';
import moment from 'moment';
import {
    Avatar,
    Grid,
    Paper,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import PaginationContainer from './components/PaginationContainer';
import AddCommentContainer from './components/AddCommentContainer';
import { ICommentReaction, IFile } from 'app/interfaces';
import useGetAuthedUser from 'app/hooks/getAuthedUser';
import { useStyles } from './hooks/useStyles';
import { IProps } from './interfaces';

const CommentsMap: React.FC<IProps> = ({
    threadId,
    comments,
    reactions,
    threadCreatorId,
}) => {
    const [viewingImage, setViewingImage] = useState<IFile | null>(null);
    const [leavingReaction, setLeavingReaction] = useState(false);

    const authedUser = useGetAuthedUser();
    const styles = useStyles();
    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    const disableForwardButton =
        comments.meta.current_page === comments.meta.last_page;

    const disableBackButton = comments.meta.current_page === 1;

    const getCommentReactionTooltip = useCallback(
        (commentReactions: ICommentReaction[]) => {
            const reactedUsers = commentReactions.map(
                (cr) => cr.user.profile?.username,
            );

            let returnString = 'Left by ';

            returnString += reactedUsers[0] ?? '';
            returnString += reactedUsers[1] ? `, ${reactedUsers[1]}` : '';
            returnString += reactedUsers[2] ? `, ${reactedUsers[2]}` : '';

            if (reactedUsers.length > 3) {
                return (returnString += `, and ${
                    reactedUsers.length - 3
                } others.`);
            }

            return (returnString += '.');
        },
        [],
    );

    const handleLeaveReaction = (commentId: number, reactionId: number) => {
        setLeavingReaction(true);

        Inertia.put(
            `/comments/${commentId}/react`,
            {
                reaction: reactionId,
            },
            {
                onFinish: () => {
                    setLeavingReaction(false);
                },
            },
        );
    };

    return (
        <Grid container spacing={3}>
            {comments.data.map(
                ({
                    id,
                    createdAt,
                    content,
                    creator,
                    images,
                    commentReactions,
                }) => (
                    <Grid item xs={12} key={id} sx={styles.commentContainer}>
                        <Grid container spacing={3}>
                            {!isMd && (
                                <Grid item md={3}>
                                    <Paper sx={styles.userPaper}>
                                        <Box
                                            sx={styles.profilePictureContainer}
                                        >
                                            <Avatar
                                                sx={styles.profilePicture}
                                                src={
                                                    creator.profile
                                                        ?.profilePicture?.url ??
                                                    undefined
                                                }
                                                alt="User's profile picture"
                                            />

                                            {creator.id === threadCreatorId && (
                                                <Tooltip title="Creator of this thread.">
                                                    <Box
                                                        sx={styles.creatorBadge}
                                                    >
                                                        <Edit
                                                            sx={
                                                                styles.creatorIcon
                                                            }
                                                        />
                                                    </Box>
                                                </Tooltip>
                                            )}
                                        </Box>

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
                                            <Grid item xs={12} md={4}>
                                                <Box
                                                    sx={
                                                        styles.reactionsMapContainer
                                                    }
                                                >
                                                    {reactions.map(
                                                        (reaction) => {
                                                            const thisCommentReactions =
                                                                commentReactions.filter(
                                                                    (
                                                                        commentReaction,
                                                                    ) =>
                                                                        commentReaction
                                                                            .reaction
                                                                            .id ===
                                                                        reaction.id,
                                                                );

                                                            return (
                                                                <Box
                                                                    sx={
                                                                        styles.reactionAndCountContainer
                                                                    }
                                                                    key={
                                                                        reaction.id
                                                                    }
                                                                >
                                                                    <Box
                                                                        sx={
                                                                            styles.reactionIcon
                                                                        }
                                                                        alt={`Reaction for ${reaction.name}`}
                                                                        src={`/images/${reaction.iconPath}`}
                                                                        component="img"
                                                                        onClick={() => {
                                                                            if (
                                                                                leavingReaction
                                                                            ) {
                                                                                return;
                                                                            }

                                                                            handleLeaveReaction(
                                                                                id,
                                                                                reaction.id,
                                                                            );
                                                                        }}
                                                                    />

                                                                    {thisCommentReactions.length ? (
                                                                        <Tooltip
                                                                            title={getCommentReactionTooltip(
                                                                                thisCommentReactions,
                                                                            )}
                                                                        >
                                                                            <Typography
                                                                                variant="subtitle2"
                                                                                style={
                                                                                    thisCommentReactions.find(
                                                                                        (
                                                                                            cr,
                                                                                        ) =>
                                                                                            cr
                                                                                                .user
                                                                                                .id ===
                                                                                            authedUser?.id,
                                                                                    )
                                                                                        ? styles.reactionActiveUserLeft
                                                                                        : styles.reactionActive
                                                                                }
                                                                            >
                                                                                {
                                                                                    thisCommentReactions.length
                                                                                }
                                                                            </Typography>
                                                                        </Tooltip>
                                                                    ) : (
                                                                        <Typography variant="subtitle2">
                                                                            0
                                                                        </Typography>
                                                                    )}
                                                                </Box>
                                                            );
                                                        },
                                                    )}
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={8}>
                                                <Box
                                                    sx={
                                                        styles.commentImagesContainer
                                                    }
                                                >
                                                    {images.map(
                                                        (
                                                            image,
                                                            index,
                                                            self,
                                                        ) => (
                                                            <Box
                                                                sx={
                                                                    index ===
                                                                    self.length -
                                                                        1
                                                                        ? styles.commentImageEnd
                                                                        : styles.commentImage
                                                                }
                                                                alt="Uploaded image"
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
                ),
            )}

            <Grid item xs={12} style={styles.addCommentGridItem}>
                <AddCommentContainer threadId={threadId} />
            </Grid>

            <Grid item xs={12}>
                <PaginationContainer
                    disableBack={disableBackButton}
                    disableForward={disableForwardButton}
                    comments={comments}
                    threadId={threadId}
                />
            </Grid>

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
