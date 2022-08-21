<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\EmailVerification\ResendEmailRequest;
use App\Http\Requests\EmailVerification\IndexRequest;
use App\Http\Controllers\Controller;

class EmailVerificationController extends Controller {
    /**
     * Show the notice informing of pending email verification.
     *
     * @param IndexRequest $request
     * 
     * @return Response
     */
    public function index(IndexRequest $request): Response|RedirectResponse {
        // If the user refreshes the page after verifying their email in
        // another tab, we want to redirect to the home page rather than
        // the alternative, which is failing with a 403.
        if ((bool)auth()->user()->email_verified_at) {
            return redirect()->route('home');
        }

        return Inertia::render(
            'Authed/Email/NeedsVerification/index',
            [
                'email' => auth()->user()->email,
            ]
        );
    }

    /**
     * Verify a user's email.
     *
     * @param EmailVerificationRequest $request
     * 
     * @return RedirectResponse
     */
    public function verify(EmailVerificationRequest $request): RedirectResponse {
        $request->fulfill();

        return redirect()->route('home')->with('successMessage', 'Email was verified.');
    }

    /**
     * Resend a verification email.
     *
     * @param ResendEmailRequest $request
     * 
     * @return RedirectResponse
     */
    public function resendEmail(ResendEmailRequest $request): RedirectResponse {
        auth()->user()->sendEmailVerificationNotification();

        return back()->with('successMessage', 'Verification link was resent.');
    }
}
