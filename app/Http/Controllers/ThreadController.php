<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Thread\IndexRequest;
use App\Http\Requests\Thread\StoreRequest;
use App\Http\Requests\Thread\ShowRequest;

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

    /**
     * Store a new thread.
     *
     * @param StoreRequest
     * @return Response
     */
    public function store(StoreRequest $request): RedirectResponse {
        return redirect()->route('thread.show', ['thread' => $request->createThread()->id]);
    }

    /**
     * Return the requested thread.
     *
     * @param ShowRequest $request
     * 
     * @return Response
     */
    public function show(ShowRequest $request): Response {
        return Inertia::render('Authed/Thread/View/index');
    }
}
