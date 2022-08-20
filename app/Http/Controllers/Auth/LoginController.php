<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Login\IndexRequest;
use App\Http\Controllers\Controller;

use Inertia\Response;
use Inertia\Inertia;

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
}
