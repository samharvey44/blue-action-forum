<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Http\Requests\Comment\ReactRequest;
use App\Models\CommentReaction;
use App\Models\Reaction;
use App\Models\Comment;

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

        if ($existingReaction?->reaction?->id === $request->get('reaction')) {
            $existingReaction->delete();

            return;
        }

        // If we've reached this point and have an existing reaction, it means
        // the user is trying to react more than once to a comment, which is 
        // not allowed.
        if ((bool)$existingReaction) {
            abort(422, 'Leaving this reaction is forbidden.');
        }

        $commentReaction = CommentReaction::make();

        $commentReaction->reaction()->associate(Reaction::find($request->get('reaction')));
        $commentReaction->user()->associate(Auth::user());
        $commentReaction->comment()->associate($comment);

        $commentReaction->save();
    }
}
