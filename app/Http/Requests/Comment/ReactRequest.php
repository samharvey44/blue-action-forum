<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\CommentReaction;
use App\Models\Reaction;
use App\Models\Comment;

use Auth;

class ReactRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array {
        return [
            'reaction' => 'required|exists:reactions,id',
        ];
    }

    /**
     * Determine whether the user has already reacted to this comment.
     * 
     * @return ?CommentReaction
     */
    public function findExistingReaction(Comment $comment): ?CommentReaction {
        $commentReaction = CommentReaction::whereRelation('user', 'id', Auth::id())
            ->whereRelation('comment', 'id', $comment->id)
            ->first();

        return $commentReaction;
    }

    /**
     * Store the comment reaction to the given comment.
     * 
     * @param Comment $comment The comment we are storing the comment reaction against.
     * 
     * @return void
     */
    public function storeCommentReaction(Comment $comment): void {
        $commentReaction = CommentReaction::make();

        $commentReaction->reaction()->associate(Reaction::find($this->get('reaction')));
        $commentReaction->user()->associate(Auth::user());
        $commentReaction->comment()->associate($comment);

        $commentReaction->save();
    }
}
