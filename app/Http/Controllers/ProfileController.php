<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Profile\ChangeProfilePictureRequest;
use App\Http\Requests\Profile\ToggleSuspendedRequest;
use App\Http\Requests\Profile\ToggleReportedRequest;
use App\Http\Requests\Profile\DeleteRequest;
use App\Http\Requests\Profile\UpdateRequest;
use App\Http\Requests\Profile\IndexRequest;
use App\Http\Requests\Profile\StoreRequest;
use App\Http\Requests\Profile\EditRequest;
use App\Http\Requests\Profile\ShowRequest;
use App\Http\Requests\Profile\ToggleAdminRequest;
use App\Http\Resources\UserResource;
use App\Models\Profile;
use App\Models\Role;
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

    /**
     * Delete the authed user's account and profile.
     * 
     * @param DeleteRequest $request
     * 
     * @return void
     */
    public function delete(DeleteRequest $request): void {
        if (!Auth::user()->suspendableAndDeletable()) {
            abort(403, "System users can't be deleted!");
        }

        $request->handleDelete();
    }

    /**
     * Toggle the suspended status of the given profile's user.
     * 
     * @param ToggleSuspendedRequest $request
     * @param Profile $profile
     * 
     * @return bool
     */
    public function toggleSuspended(ToggleSuspendedRequest $request, Profile $profile): bool {
        $user = $profile->user;

        if (!$user->suspendableAndDeletable()) {
            abort(403, "System users can't be suspended!");
        }

        $user->forceFill(['is_suspended' => !$user->is_suspended]);
        $user->update();

        return $user->is_suspended;
    }

    /**
     * Toggle the admin status of the given profile's user.
     * 
     * @param ToggleAdminRequest $request
     * @param Profile $profile
     * 
     * @return bool
     */
    public function toggleAdmin(ToggleAdminRequest $request, Profile $profile): bool {
        $user = $profile->user;
        $role = $user->role->name;

        if ($role === Role::SUPER_ADMIN) {
            abort(403, 'The role of a super user cannot be changed.');
        }

        $user->role()->associate(
            Role::firstWhere('name', $role === 'Admin' ? 'User' : 'Admin')
        );

        $user->update();

        return $user->role->name === 'Admin';
    }
}
