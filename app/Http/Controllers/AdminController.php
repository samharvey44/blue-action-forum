<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Admin\IndexRequest;

class AdminController extends Controller {
    /**
     * Return the home page.
     *
     * @param IndexRequest $request
     * 
     * @return Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Authed/Admin/index');
    }
}
