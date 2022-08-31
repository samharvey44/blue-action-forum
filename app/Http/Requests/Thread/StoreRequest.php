<?php

namespace App\Http\Requests\Thread;

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
            'title' => 'required|string|min:5|max:50',
            'content' => 'required|string|max:600',
            'images' => 'sometimes|nullable|array',
            'images.*' => 'required|' . Image::getValidationString(),
        ];
    }

    /**
     * Store the first comment against the created thread.
     *
     * @param Thread $thread The thread to store the comment against.
     * 
     * @return void
     */
    private function storeComment(Thread $thread): void {
        $comment = Comment::make([
            'content' => $this->get('content'),
        ]);

        $comment->storeCreator(Auth::user());
        $comment->thread()->associate($thread);
        $comment->save();
    }

    /**
     * Store the requested images to the created thread.
     *
     * @param Thread $thread The thread to associate images to.
     * 
     * @return void
     */
    private function storeImages(Thread $thread): void {
        foreach ($this->file('images') as $image) {
            Image::storeAndAssociate($image, $thread);
        }
    }

    /**
     * Create a new thread.
     *
     * @return Thread
     */
    public function createThread(): Thread {
        $thread = Thread::make([
            'title' => $this->get('title'),
        ]);

        DB::transaction(function () use (&$thread) {
            $thread->storeCreator(Auth::user());
            $thread->save();

            $this->storeComment($thread);
            $this->storeImages($thread);
        });

        return $thread;
    }
}
