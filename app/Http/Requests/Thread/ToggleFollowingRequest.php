<?php

namespace App\Http\Requests\Thread;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\Thread;

use Auth;

class ToggleFollowingRequest extends FormRequest {
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
            //
        ];
    }

    /**
     * Follow or unfollow the given thread.
     * 
     * @param Thread $thread The thread to follow or unfollow.
     * 
     * @return bool Whether the user is consequently following the thread.
     */
    public function followOrUnfollow(Thread $thread): bool {
        $user = Auth::user();

        if ($user->isFollowing($thread)) {
            $user->threadsFollowing()->detach($thread->id);

            return false;
        } else {
            $user->threadsFollowing()->attach($thread->id);

            return true;
        }
    }
}
