<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\Comment;
use App\Models\Thread;
use App\Models\Image;
use App\Models\Role;

use Auth;
use DB;

class StoreRequest extends FormRequest {
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
            'content' => 'required|string|max:600',
            'images' => 'sometimes|nullable|array',
            'images.*' => 'required|' . Image::getValidationString(),
            'replyingTo' => 'sometimes|nullable|int|exists:comments,id'
        ];
    }

    /**
     * Return whether a lock on the given thread prevents the authed user from commenting
     * 
     * @param Thread $thread The thread to make the check for.
     * 
     * @return bool Whether or not the user is being prevented from commenting due to a lock.
     */
    public function lockPreventingComment(Thread $thread): bool {
        return $thread->is_locked
            ? !Auth::user()->hasRole(Role::SUPER_ADMIN) && !Auth::user()->hasRole(Role::ADMIN)
            : false;
    }

    /**
     * Store the comment.
     *
     * @param Thread $thread The thread to store the comment against.
     * 
     * @return Comment
     */
    public function storeComment(Thread $thread): Comment {
        $comment = Comment::make([
            'content' => $this->get('content'),
        ]);

        $comment->storeCreator(Auth::user());
        $comment->thread()->associate($thread);

        if ((bool)$this->get('replyingTo')) {
            $comment->replyingTo()->associate(Comment::find($this->get('replyingTo')));
        }

        $comment->save();

        return $comment;
    }

    /**
     * Store and associate the requested images to the comment.
     *
     * @param Comment $thread The comment to associate images to.
     * 
     * @return void
     */
    public function storeImages(Comment $comment): void {
        foreach ($this->file('images') ?? [] as $image) {
            Image::storeAndAssociate($image, $comment);
        }
    }
}
