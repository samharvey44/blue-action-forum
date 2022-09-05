<?php

namespace App\Http\Requests\Thread;

use App\Models\Category;
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
            'categories' => 'required|array|min:1',
            // We won't check whether the id exists, since we are going to do this later on.
            'categories.*' => 'required|numeric|distinct'
        ];
    }

    /**
     * Validate the provided category ids.
     *
     * @param array $categoryIds
     * 
     * @return bool
     */
    private function validateCategories(array $categoryIds): bool {
        $requestedCategories = Category::whereIn('id', $categoryIds)->with('roles')->get();

        $passed = true;

        foreach ($categoryIds as $id) {
            $matchingCategory = $requestedCategories->filter(fn ($category) => $category->id === $id)->first();

            $passed = (bool)$matchingCategory
                ? $matchingCategory->roles->map(fn ($role) => $role->id)->contains(Auth::user()->role->id)
                : false;

            if (!$passed) {
                break;
            }
        }

        return $passed;
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
        foreach ($this->file('images') ?? [] as $image) {
            Image::storeAndAssociate($image, $thread);
        }
    }

    /**
     * Associate categories to the thread.
     *
     * @param array $categoryIds
     * 
     * @return void
     */
    private function associateCategories(Thread $thread): void {
        $thread->categories()->attach($this->get('categories'));
    }

    /**
     * Create a new thread.
     *
     * @return Thread
     */
    public function createThread(): Thread {
        $categoriesValidated = $this->validateCategories($this->get('categories'));

        abort_if(!$categoriesValidated, 422, 'Invalid categories provided.');

        $thread = Thread::make([
            'title' => $this->get('title'),
        ]);

        DB::transaction(function () use (&$thread) {
            $thread->storeCreator(Auth::user());
            $thread->save();

            $this->associateCategories($thread);
            $this->storeComment($thread);
            $this->storeImages($thread);
        });

        return $thread;
    }
}
