<?php

namespace App\Http\Controllers;

use Inertia\Response;
use Inertia\Inertia;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use App\Http\Requests\Admin\Users\GetUsersRequest;
use App\Http\Requests\Admin\IndexRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class AdminController extends Controller {
    /**
     * Return the admin page.
     *
     * @param IndexRequest $request
     * 
     * @return Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Authed/Admin/index');
    }

    /**
     * Get a paginated collection of users.
     * 
     * @param GetUsersRequest $request
     * 
     * @return AnonymousResourceCollection
     */
    public function getUsers(GetUsersRequest $request): AnonymousResourceCollection {
        return UserResource::collection(
            User::undeleted()->orderByDesc('id')->paginate($request->get('rowsPerPage'))
        );
    }
}
