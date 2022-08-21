<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Signup\SignupRequest;
use App\Http\Requests\Signup\IndexRequest;
use App\Http\Controllers\Controller;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

class SignupController extends Controller {
    /**
     * Return the signup view.
     * 
     * @param IndexRequest
     *
     * @return Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Unauthed/Signup/index');
    }

    /**
     * Create a new user by the given request parameters.
     *
     * @param SignupRequest
     * 
     * @return RedirectResponse
     */
    public function signup(SignupRequest $request): RedirectResponse {
        $user = $request->createUser();

        auth()->login($user);

        return redirect()->route('home');
    }
}
