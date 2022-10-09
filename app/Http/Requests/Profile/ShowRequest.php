<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\User;

use Auth;

class ShowRequest extends FormRequest {
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
     * Get statistics to display on the user's profile.
     * 
     * @param User $user The user to get statistics for.
     * 
     * @return array The array of statistics.
     */
    public function getStatisticsFor(User $user): array {
        return [
            'threadsCreated' => $user->threads()->count(),
            'commentsCreated' => $user->comments()->count(),
        ];
    }
}
