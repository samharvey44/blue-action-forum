<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\Role\IndexRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\RoleResource;
use App\Models\Role;

class RoleController extends Controller {
    /**
     * Return all roles.
     *
     * @return \App\Http\Resources\RoleResource
     */
    public function index(IndexRequest $request) {
        return RoleResource::collection(Role::all());
    }
}
