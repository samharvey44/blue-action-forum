<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Signup\SignupRequest;
use App\Http\Requests\Signup\IndexRequest;
use App\Http\Controllers\Controller;
use App\Models\SignupInvitation;

use Auth;

class SignupController extends Controller {
    /**
     * Return the signup view.
     * 
     * @param IndexRequest $request
     * @param string $token
     *
     * @return Response
     */
    public function index(IndexRequest $request, string $token): Response {
        if (!$request->hasValidSignature() || !SignupInvitation::validate($token)) {
            abort(404);
        }

        return Inertia::render('Unauthed/Signup/index');
    }

    /**
     * Create a new user by the given request parameters.
     *
     * @param SignupRequest $request
     * @param string $token
     * 
     * @return RedirectResponse
     */
    public function signup(SignupRequest $request, string $token): RedirectResponse {
        if (!$request->hasValidSignature() || !SignupInvitation::validate($token)) {
            abort(404);
        }

        $user = $request->createUser();
        Auth::login($user);

        return redirect()->route('profile.create');
    }
}
