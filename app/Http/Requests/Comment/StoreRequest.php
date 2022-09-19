<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\Comment;
use App\Models\Thread;
use App\Models\Image;

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
        ];
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
