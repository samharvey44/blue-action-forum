<?php

namespace App\Http\Requests\PasswordReset;

use Illuminate\Foundation\Http\FormRequest;

use Auth;

class ShowResetRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool {
        return !Auth::check();
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
