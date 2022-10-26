<?php

namespace App\Http\Requests\Profile;

use App\Events\ImageDeleting;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

use App\Events\UserDeleting;

use Auth;

class DeleteRequest extends FormRequest {
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
     * Delete the profile data for the user.
     * 
     * @return void
     */
    private function deleteProfileData(): void {
        $profile = Auth::user()->profile->load('reports');

        $profile->reports->each->delete();

        if ((bool)$profile->profilePicture) {
            ImageDeleting::dispatch($profile->profilePicture);

            $profile->profilePicture->delete();
        }

        $profile->delete();
    }

    /**
     * Handle deleting the authed user's account.
     * 
     * @return void
     */
    public function handleDelete(): void {
        $user = Auth::user()->load('reads');

        DB::transaction(function () use ($user) {
            UserDeleting::dispatch($user);

            $this->deleteProfileData();
            $user->threadsFollowing()->detach();
            $user->reads->each->delete();

            $user->delete();
        });

        session()->invalidate();
        Auth::logout();
    }
}
