<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Signup\SignupRequest;
use App\Http\Requests\Signup\IndexRequest;
use App\Http\Controllers\Controller;

use Auth;

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

        Auth::login($user);

        // return redirect()->route('verification.notice');
        return redirect()->route('home');
    }
}
