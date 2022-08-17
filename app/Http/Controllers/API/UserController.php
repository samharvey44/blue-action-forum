<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\User\IndexRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

use Auth;

class UserController extends Controller {
    /**
     * Return the authenticated user.
     *
     * @return \App\Http\Resources\UserResource
     */
    public function index(IndexRequest $request) {
        return UserResource::make(Auth::user());
    }
}
