<?php

namespace App\Http\Requests\PasswordReset;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;

use Str;

class ResetRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool {
        return !auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array {
        return [
            'password' => 'required|min:8|confirmed',
            'token' => 'required|string',
            'email' => 'required|email',
        ];
    }

    /**
     * Handle the password reset.
     *
     * @return RedirectResponse
     */
    public function handleReset(): RedirectResponse {
        $status = Password::reset(
            $this->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->update();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('login.show')
            : back()->withErrors(['reset' => [__($status)]]);
    }
}
