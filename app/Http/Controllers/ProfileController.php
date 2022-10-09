<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Profile\IndexRequest;
use App\Http\Requests\Profile\ShowRequest;
use App\Http\Requests\Profile\StoreRequest;
use App\Http\Resources\UserResource;
use App\Models\Profile;

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

    /**
     * Store a new profile.
     *
     * @param StoreRequest $request
     * 
     * @return RedirectResponse
     */
    public function store(StoreRequest $request): RedirectResponse {
        $request->createProfile();

        return redirect()->route('home');
    }

    /**
     * Show the requested profile.
     * 
     * @param ShowRequest $request
     * 
     * @return Response
     */
    public function show(ShowRequest $request, Profile $profile): Response {
        return Inertia::render('Authed/Profile/View/index', [
            'user' => UserResource::make($profile->user),
            'statistics' => $request->getStatisticsFor($profile->user),
        ]);
    }
}
