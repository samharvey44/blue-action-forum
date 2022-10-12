import React, { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageViewer from 'react-simple-image-viewer';
import { Inertia } from '@inertiajs/inertia';
import { useSnackbar } from 'notistack';
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
import {
    Delete,
    Edit,
    Reply,
    Report,
    ReportProblem,
} from '@mui/icons-material';

import PaginationContainer from './components/PaginationContainer';
import AddCommentContainer from './components/AddCommentContainer';
import { ICommentReaction, IFile } from 'app/interfaces';
import useGetAuthedUser from 'app/hooks/getAuthedUser';
import { useStyles } from './hooks/useStyles';
import { ellipsise } from 'app/helpers';
import { IProps } from './interfaces';

const CommentsMap: React.FC<IProps> = ({
    threadId,
    comments,
    reactions,
    threadCreatorId,
    threadIsLocked,
}) => {
    const [userReplyingTo, setUserReplyingTo] = useState<number | null>(null);
    const [viewingImage, setViewingImage] = useState<IFile | null>(null);
    const [reportingComment, setReportingComment] = useState(false);
    const [deletingComment, setDeletingComment] = useState(false);
    const [leavingReaction, setLeavingReaction] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const authedUser = useGetAuthedUser();
    const styles = useStyles();
    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    const replyContainer = useRef<HTMLDivElement | null>(null);

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

    const handleDeleteComment = (commentId: number) => {
        setDeletingComment(true);

        Inertia.delete(`/comments/${commentId}`, {
            onFinish: () => {
                setDeletingComment(false);

                enqueueSnackbar('Comment was deleted.', {
                    variant: 'success',
                });
            },
        });
    };

    const handleToggleReported = (commentId: number, isReported: boolean) => {
        setReportingComment(true);

        Inertia.patch(`/comments/${commentId}/report`, undefined, {
            onFinish: () => {
                setReportingComment(false);

                enqueueSnackbar(
                    `Comment was ${isReported ? 'unreported' : 'reported'}.`,
                    {
                        variant: 'success',
                    },
                );
            },
        });
    };

    const userIsAdmin = useMemo(
        () => ['Super Admin', 'Admin'].some((r) => r === authedUser?.role.name),
        [authedUser?.role.name],
    );

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
                    isDeleted,
                    isReportedByUser,
                    isReported,
                    replyingTo,
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
                                        <Box
                                            sx={styles.commentActionsContainer}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={styles.postedAtText}
                                            >
                                                Posted{' '}
                                                {moment
                                                    .utc(createdAt)
                                                    .local()
                                                    .format(
                                                        'DD/MM/YY [at] HH:mm',
                                                    )}
                                            </Typography>

                                            <Box
                                                sx={
                                                    styles.commentActionsInnerContainer
                                                }
                                            >
                                                {!isDeleted && (
                                                    <Fragment>
                                                        <Tooltip title="Reply to this comment.">
                                                            <Reply
                                                                sx={
                                                                    styles.actionIconNomargin
                                                                }
                                                                onClick={() => {
                                                                    setUserReplyingTo(
                                                                        id,
                                                                    );

                                                                    if (
                                                                        replyContainer.current
                                                                    ) {
                                                                        replyContainer.current.scrollIntoView(
                                                                            {
                                                                                behavior:
                                                                                    'smooth',
                                                                            },
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                        </Tooltip>

                                                        {creator.id ===
                                                        authedUser?.id ? (
                                                            !isDeleted && (
                                                                <Tooltip title="Delete your comment.">
                                                                    <Delete
                                                                        sx={
                                                                            styles.actionIcon
                                                                        }
                                                                        onClick={() => {
                                                                            if (
                                                                                deletingComment
                                                                            ) {
                                                                                return;
                                                                            }

                                                                            handleDeleteComment(
                                                                                id,
                                                                            );
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            )
                                                        ) : (
                                                            <Tooltip
                                                                title={
                                                                    isReportedByUser
                                                                        ? 'Unreport this comment.'
                                                                        : 'Report this comment.'
                                                                }
                                                            >
                                                                <Report
                                                                    onClick={() => {
                                                                        if (
                                                                            reportingComment
                                                                        ) {
                                                                            return;
                                                                        }

                                                                        handleToggleReported(
                                                                            id,
                                                                            isReportedByUser,
                                                                        );
                                                                    }}
                                                                    sx={
                                                                        isReportedByUser
                                                                            ? styles.reportIconReported
                                                                            : styles.actionIcon
                                                                    }
                                                                />
                                                            </Tooltip>
                                                        )}
                                                    </Fragment>
                                                )}

                                                {userIsAdmin && isReported && (
                                                    <Tooltip title="Comment has been reported by a user.">
                                                        <ReportProblem
                                                            style={
                                                                styles.commentReportedIcon
                                                            }
                                                        />
                                                    </Tooltip>
                                                )}
                                            </Box>
                                        </Box>

                                        {replyingTo && (
                                            <Box sx={styles.replyingContainer}>
                                                <Typography variant="subtitle1">
                                                    In reply to{' '}
                                                    <span
                                                        style={
                                                            styles.replyingToText
                                                        }
                                                    >
                                                        {
                                                            replyingTo.creator
                                                                .profile
                                                                ?.username
                                                        }
                                                    </span>
                                                </Typography>

                                                {replyingTo.isDeleted ? (
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={
                                                            styles.replyTextDeleted
                                                        }
                                                    >
                                                        <b>
                                                            Comment was deleted
                                                            by poster!
                                                        </b>
                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={styles.replyText}
                                                    >
                                                        {replyingTo.content &&
                                                            ellipsise(
                                                                replyingTo.content,
                                                                70,
                                                            )}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}

                                        {isDeleted ? (
                                            <Typography
                                                variant="subtitle1"
                                                sx={
                                                    styles.commentContentDeleted
                                                }
                                            >
                                                <b>
                                                    Comment was deleted by
                                                    poster!
                                                </b>
                                            </Typography>
                                        ) : (
                                            <Typography
                                                variant="subtitle1"
                                                sx={styles.commentContent}
                                            >
                                                {content ?? ''}
                                            </Typography>
                                        )}

                                        {!isDeleted && (
                                            <Fragment>
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
                                                            {images?.map(
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
                                                                        src={
                                                                            image.url
                                                                        }
                                                                        key={
                                                                            image.id
                                                                        }
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
                                            </Fragment>
                                        )}
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                ),
            )}

            {(!threadIsLocked || userIsAdmin) && (
                <Grid item xs={12} style={styles.addCommentGridItem}>
                    <AddCommentContainer
                        threadId={threadId}
                        replyingTo={
                            comments.data.find(
                                (c) => c.id === userReplyingTo,
                            ) ?? null
                        }
                        setReplyingTo={setUserReplyingTo}
                        containerRef={replyContainer}
                    />
                </Grid>
            )}

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
