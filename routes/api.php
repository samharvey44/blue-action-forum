<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\RoleController;
use App\Http\Controllers\API\UserController;

Route::middleware('auth:sanctum')->group(function () {
    //
});


Route::middleware('guest')->group(function () {
    //
});
