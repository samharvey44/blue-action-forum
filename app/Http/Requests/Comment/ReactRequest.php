<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Comment;

use App\Models\CommentReaction;

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
        // We only want to allow the user to leave one reaction per comment.
        $commentReaction = CommentReaction::whereHas('user', fn ($sq) => $sq->where('id', Auth::id()))
            ->whereHas('comment', fn ($sq) => $sq->where('id', $comment->id))
            ->first();

        return $commentReaction;
    }
}
