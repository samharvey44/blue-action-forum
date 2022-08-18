<?php

namespace App\Http\Controllers;

use App\Http\Requests\Signup\IndexRequest;
use Inertia\Response;
use Inertia\Inertia;

class SignupController extends Controller {
    /**
     * Return the signup view.
     * 
     * @param \App\Http\Requests\Signup\IndexRequest
     *
     * @return Inertia\Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Unauthed/Signup/index');
    }
}
