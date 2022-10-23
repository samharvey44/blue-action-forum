<?php

namespace App\Http\Controllers\Auth;

use App\Events\SignupInvitationUsed;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Signup\SignupRequest;
use App\Http\Requests\Signup\IndexRequest;
use App\Http\Controllers\Controller;
use App\Models\SignupInvitation;

use Auth;
use Illuminate\Support\Facades\DB;

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
        $matching = SignupInvitation::validate($token);

        if (!$request->hasValidSignature() || !(bool)$matching) {
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
        $matching = SignupInvitation::validate($token);

        if (!$request->hasValidSignature() || !(bool)$matching) {
            abort(404);
        }

        DB::transaction(function () use ($request, $matching) {
            $user = $request->createUser();
            SignupInvitationUsed::dispatch($matching);

            Auth::login($user);
        });


        return redirect()->route('profile.create');
    }
}
