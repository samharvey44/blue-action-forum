<?php

namespace App\Http\Requests\Signup;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\Role;
use App\Models\User;

class SignupRequest extends FormRequest {
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
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    /**
     * Create a new user.
     * 
     * @return User
     */
    public function createUser(): User {
        $newUser = User::make([
            'email' => $this->get('email'),
            'password' => bcrypt($this->get('password')),
        ]);

        $newUser->role()->associate(Role::firstWhere('name', Role::USER));
        $newUser->save();

        return $newUser;
    }
}
