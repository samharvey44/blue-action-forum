<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Profile\ChangeProfilePictureRequest;
use App\Http\Requests\Profile\ToggleReportedRequest;
use App\Http\Requests\Profile\UpdateRequest;
use App\Http\Requests\Profile\IndexRequest;
use App\Http\Requests\Profile\StoreRequest;
use App\Http\Requests\Profile\EditRequest;
use App\Http\Requests\Profile\ShowRequest;
use App\Http\Resources\UserResource;
use App\Models\Profile;

use Auth;

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
        ]);
    }

    /**
     * Toggle whether the authed user has reported this profile.
     * 
     * @param ToggleReportedRequest $request
     * @param Profile $profile
     * 
     * @return JsonResponse
     */
    public function toggleReported(ToggleReportedRequest $request, Profile $profile): JsonResponse {
        return response()->json($request->createOrDeleteReportFor($profile));
    }

    /**
     * Show the edit profile screen.
     * 
     * @param EditRequest $request
     * 
     * @return Response
     */
    public function edit(EditRequest $request): Response {
        return Inertia::render('Authed/Profile/Edit/index');
    }

    /**
     * Change the authed user's profile picture.
     * 
     * @param ChangeProfilePictureRequest $request
     * 
     * @return void
     */
    public function changeProfilePicture(ChangeProfilePictureRequest $request): void {
        $profilePicture = $request->file('profilePicture');

        Auth::user()->profile->changeProfilePicture($profilePicture);
    }

    /**
     * Update the authed user's profile details.
     * 
     * @param UpdateRequest $request
     * 
     * @return void
     */
    public function update(UpdateRequest $request): void {
        Auth::user()->profile->update($request->only(['location', 'bio']));
    }
}
