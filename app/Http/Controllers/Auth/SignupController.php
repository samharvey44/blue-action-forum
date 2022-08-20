<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Signup\IndexRequest;
use App\Http\Controllers\Controller;

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
}
