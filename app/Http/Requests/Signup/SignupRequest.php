<?php

namespace App\Http\Requests\Signup;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
use App\Models\Role;

use Auth;

class SignupRequest extends FormRequest {
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
        ]);

        $newUser->forceFill(['password' => Hash::make('password')]);

        $newUser->role()->associate(Role::firstWhere('name', Role::USER));
        $newUser->save();

        event(new Registered($newUser));

        return $newUser;
    }
}
