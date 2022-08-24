<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Profile\IndexRequest;

class ProfileController extends Controller {
    /**
     * Return the create profile page.
     *
     * @param IndexRequest $request
     * 
     * @return Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Authed/Profile/Create/index');
    }
}
