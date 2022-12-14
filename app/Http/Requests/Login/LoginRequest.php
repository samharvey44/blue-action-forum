<?php

namespace App\Http\Requests\Login;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use Auth;

class LoginRequest extends FormRequest {
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
            'email' => 'required|email',
            'password' => 'required|string',
            'rememberMe' => 'required|boolean',
        ];
    }

    /**
     * Check credentials and log in the user if they match.
     * 
     * @return RedirectResponse
     */
    public function loginUser(): RedirectResponse {
        $matchingUser = User::firstWhere('email', $this->get('email'));

        if (!Hash::check($this->get('password'), optional($matchingUser)->password)) {
            return redirect()->back()->withErrors([
                'login' => 'Email or password were incorrect!',
            ]);
        }

        if ($matchingUser->is_suspended) {
            return redirect()->back()->withErrors([
                'suspended' => 'Your account has been suspended by an administrator.'
            ]);
        }

        Auth::login($matchingUser, $this->get('rememberMe'));

        return Auth::user()->hasCreatedProfile()
            ? redirect()->route('home')
            : redirect()->route('profile.create');
    }
}
