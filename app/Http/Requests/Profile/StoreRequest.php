<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

use App\Models\Profile;
use App\Models\Image;
use Auth;

class StoreRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool {
        return Auth::check() && !Auth::user()->hasCreatedProfile();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array {
        return [
            'username' => 'required|alpha_dash|string|min:3|max:30|unique:profiles,username',
            'location' => 'sometimes|nullable|max:30',
            'bio' => 'sometimes|nullable|max:200',
            'profilePicture' => 'sometimes|nullable|' . Image::getValidationString(),
        ];
    }

    /**
     * Create a new profile.
     *
     * @return void
     */
    public function createProfile(): void {
        DB::transaction(function () {
            $newProfile = Profile::make([
                'location' => $this->get('location'),
                'bio' => $this->get('bio'),
            ])->forceFill([
                'username' => strtolower($this->get('username')),
            ]);

            $newProfile->user()->associate(Auth::user());
            $newProfile->save();

            $profilePicture = $this->file('profilePicture');

            if ((bool)$profilePicture) {
                Image::storeAndAssociate($profilePicture, $newProfile);
            }
        });
    }
}
