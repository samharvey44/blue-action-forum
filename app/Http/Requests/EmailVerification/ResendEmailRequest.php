<?php

namespace App\Http\Requests\EmailVerification;

use Illuminate\Foundation\Http\FormRequest;

use Auth;

class ResendEmailRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool {
        return Auth::check() && is_null(Auth::user()->email_verified_at);
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
