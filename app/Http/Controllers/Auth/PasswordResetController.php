<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Password;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\PasswordReset\ShowResetRequest;
use App\Http\Requests\PasswordReset\SendLinkRequest;
use App\Http\Requests\PasswordReset\IndexRequest;
use App\Http\Requests\PasswordReset\ResetRequest;
use App\Http\Controllers\Controller;
use App\Models\User;

class PasswordResetController extends Controller {
    /**
     * Display the password reset form.
     *
     * @param IndexRequest $request
     * 
     * @return Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Unauthed/PasswordReset/index');
    }

    /**
     * Send a password reset link, if the requested email is 
     * registered to an account.
     *
     * @param SendLinkRequest $request
     * 
     * @return void
     */
    public function sendLink(SendLinkRequest $request): void {
        if (!(bool)User::firstWhere('email', $request->get('email'))) {
            return;
        }

        Password::sendResetLink($request->only('email'));
    }

    /**
     * Show the form for the password reset.
     *
     * @param ShowResetRequest $request
     * @param string $token The unique token for the password reset.
     * 
     * @return Response
     */
    public function showReset(ShowResetRequest $request, string $token): Response {
        return Inertia::render('Unauthed/PasswordReset/Reset/index', [
            'token' => $token,
        ]);
    }

    /**
     * Reset the requested user's password.
     *
     * @param ResetRequest $request
     * 
     * @return RedirectResponse
     */
    public function reset(ResetRequest $request): RedirectResponse {
        return $request->handleReset();
    }
}
