<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Controller;

use App\Http\Requests\Logout\IndexRequest;

class LogoutController extends Controller {
    /**
     * Log out the authed user.
     * 
     * @param IndexRequest
     *
     * @return RedirectResponse
     */
    public function index(IndexRequest $request): RedirectResponse {
        $request->handleLogout();

        return redirect()->route('login.show');
    }
}
