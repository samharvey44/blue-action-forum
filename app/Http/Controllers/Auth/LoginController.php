<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Login\IndexRequest;
use App\Http\Requests\Login\LoginRequest;
use App\Http\Controllers\Controller;

class LoginController extends Controller {
    /**
     * Return the login view.
     * 
     * @param IndexRequest
     *
     * @return Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Unauthed/Login/index');
    }

    /**
     * Log a user in based on request parameters.
     *
     * @param LoginRequest $request
     * 
     * @return RedirectResponse
     */
    public function login(LoginRequest $request): RedirectResponse {
        return $request->loginUser();
    }
}
