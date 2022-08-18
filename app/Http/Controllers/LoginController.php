<?php

namespace App\Http\Controllers;

use App\Http\Requests\Login\IndexRequest;
use Inertia\Response;
use Inertia\Inertia;

class LoginController extends Controller {
    /**
     * Return the login view.
     * 
     * @param \App\Http\Requests\Login\IndexRequest
     *
     * @return \Inertia\Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Unauthed/Login/index');
    }
}
