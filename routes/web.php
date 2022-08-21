<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\SignupController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\HomeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group(function () {
    Route::post('/logout', [LogoutController::class, 'logout'])->name('logout');

    Route::get('/home', [HomeController::class, 'index'])->name('home');
});

Route::middleware('guest')->group(function () {
    Route::prefix('/login')->group(function () {
        Route::get('/', [LoginController::class, 'index'])->name('login.show');
    });

    Route::prefix('/signup')->group(function () {
        Route::post('/', [SignupController::class, 'signup'])->name('signup.signup');
        Route::get('/', [SignupController::class, 'index'])->name('signup.show');
    });
});

Route::any(
    '{query}',
    function () {
        abort_if(auth()->check(), 404);

        return redirect()->route('login.show');
    }
)->where('query', '.*');
