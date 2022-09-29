<?php

namespace App\Http\Requests\Thread;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\Role;

use Auth;

class ToggleLockedRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool {
        return Auth::check() && (Auth::user()->hasRole(Role::SUPER_ADMIN) || Auth::user()->hasRole(Role::ADMIN));
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
}
