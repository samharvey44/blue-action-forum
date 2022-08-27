<?php

namespace App\Http\Controllers;

use App\Http\Requests\Thread\IndexRequest;
use Inertia\Response;
use Inertia\Inertia;

class ThreadController extends Controller {
    /**
     * Return the create profile page.
     *
     * @param IndexRequest $request
     * 
     * @return Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Authed/Thread/Create/index');
    }
}
