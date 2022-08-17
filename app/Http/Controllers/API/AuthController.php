<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LogoutRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;

use Auth;

class AuthController extends Controller {
    /**
     * Handle an authentication attempt.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function login(LoginRequest $request) {
        $credentials = $request->only([
            'email',
            'password'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return;
        }

        return response()->json([
            'errors' => [
                'email' => ['Invalid email or password'],
            ],
        ], 403);
    }

    /**
     * Register a new user.
     *
     * @param \App\Http\Requests\Auth\RegisterRequest $request
     * 
     * @return void
     */
    public function register(RegisterRequest $request) {
        $user = User::make([
            'password' => bcrypt($request->input('password')),
            'email' => $request->input('email'),
            'name' => $request->input('name'),
        ]);

        $user->role()->associate(Role::where('name', 'user')->first());

        $user->save();

        Auth::login($user);

        $request->session()->regenerate();
    }

    /**
     * Logout the authed user.
     *
     * @param \App\Http\Requests\Auth\LogoutRequest $request
     * 
     * @return void
     */
    public function logout(LogoutRequest $request) {
        $request->session()->invalidate();

        $request->session()->regenerateToken();
    }
}
