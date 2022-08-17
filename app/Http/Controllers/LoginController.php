<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;

class LoginController extends Controller {
    /**
     * Return the login view.
     *
     * @return Response
     */
    public function index(): Response {
        return Inertia::render('Unauthed/Login/Login');
    }
}
