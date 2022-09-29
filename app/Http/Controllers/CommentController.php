<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Http\Requests\Comment\MarkAsDeletedRequest;
use App\Http\Requests\Comment\ReactRequest;
use App\Http\Requests\Comment\StoreRequest;
use App\Models\Comment;
use App\Models\Thread;

class CommentController extends Controller {
    /**
     * React to a comment with the given reaction.
     * 
     * @param ReactRequest $request
     * @param Comment $comment
     * 
     * @return ?RedirectResponse
     */
    public function react(ReactRequest $request, Comment $comment): ?RedirectResponse {
        if ($comment->is_deleted) {
            return back()->withErrors([
                'reaction' => "You can't react to a deleted comment!",
            ]);
        }

        $existingReaction = $request->findExistingReaction($comment);

        if ($existingReaction) {
            $isRemovingReaction = $existingReaction->reaction->id === (int)$request->get('reaction');

            $existingReaction->delete();

            if ($isRemovingReaction) {
                return null;
            }
        }

        $request->storeCommentReaction($comment);

        return null;
    }

    /**
     * Store a new comment.
     * 
     * @param StoreRequest $request
     * @param Thread $thread
     * 
     * @return ?RedirectResponse
     */
    public function store(StoreRequest $request, Thread $thread): ?RedirectResponse {
        if ($request->lockPreventingComment($thread)) {
            return back()->withErrors([
                'thread' => 'The thread is locked!',
            ]);
        }

        DB::transaction(function () use ($request, $thread) {
            $comment = $request->storeComment($thread);
            $request->storeImages($comment);
        });

        return null;
    }

    /**
     * Mark the requested comment as deleted.
     * 
     * @param MarkAsDeletedRequest $request
     * @param Comment $comment
     * 
     * @return void
     */
    public function markAsDeleted(MarkAsDeletedRequest $request, Comment $comment): void {
        abort_unless($comment->creator->is(Auth::user()), 403, "You can't delete a comment that isn't yours!");

        abort_if($comment->is_deleted, 422, 'Comment is already deleted!');

        $comment->forceFill([
            'is_deleted' => true,
        ]);

        $comment->update();
    }
}
