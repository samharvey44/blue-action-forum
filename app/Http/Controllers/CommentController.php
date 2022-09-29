<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

use App\Http\Requests\Comment\ReactRequest;
use App\Http\Requests\Comment\StoreRequest;
use App\Models\Comment;
use App\Models\Thread;

class CommentController extends Controller {
    /**
     * React to comment with the given reaction.
     * 
     * @param ReactRequest $request
     * @param Comment $comment
     * 
     * @return void
     */
    public function react(ReactRequest $request, Comment $comment): void {
        $existingReaction = $request->findExistingReaction($comment);

        if ($existingReaction) {
            $isRemovingReaction = $existingReaction->reaction->id === (int)$request->get('reaction');

            $existingReaction->delete();

            if ($isRemovingReaction) {
                return;
            }
        }

        $request->storeCommentReaction($comment);
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
}
