<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;

use App\Http\Requests\Login\LogoutRequest;

class LogoutController extends Controller {
    /**
     * Log out the authed user.
     * 
     * @param LogoutRequest
     *
     * @return RedirectResponse
     */
    public function index(LogoutRequest $request): RedirectResponse {
        $request->handleLogout();

        return redirect()->route('login.show');
    }
}
