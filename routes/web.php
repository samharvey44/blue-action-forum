<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\SignupController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ProfileController;
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

Route::middleware('throttle:60,1')->group(function () {
    Route::middleware('auth')->group(function () {
        Route::post('/logout', [LogoutController::class, 'index'])->name('logout');

        Route::prefix('/email-verification')->group(function () {
            Route::get('/{id}/{hash}', [EmailVerificationController::class, 'verify'])
                ->middleware('signed')
                ->name('verification.verify');

            Route::post('/', [EmailVerificationController::class, 'resendEmail'])
                ->middleware('throttle:1,1')
                ->name('verification.send');

            Route::get('/', [EmailVerificationController::class, 'index'])->name('verification.notice');
        });

        Route::middleware('verified')->group(function () {
            Route::get('/create-profile', [ProfileController::class, 'index'])->name('profile.create');

            Route::middleware('profile.created')->group(function () {
                Route::get('/home', [HomeController::class, 'index'])->name('home');
            });
        });
    });

    Route::middleware('guest')->group(function () {
        Route::prefix('/login')->group(function () {
            Route::post('/', [LoginController::class, 'login'])->name('login.login');
            Route::get('/', [LoginController::class, 'index'])->name('login.show');
        });

        Route::prefix('/signup')->group(function () {
            Route::post('/', [SignupController::class, 'signup'])->name('signup.signup');
            Route::get('/', [SignupController::class, 'index'])->name('signup.show');
        });

        Route::prefix('password-reset')->group(function () {
            Route::post('/', [PasswordResetController::class, 'sendLink'])
                ->middleware('throttle:1,1')
                ->name('password.email');

            Route::get('/', [PasswordResetController::class, 'index'])->name('password.request');

            Route::post('/reset', [PasswordResetController::class, 'reset'])->name('password.update');

            Route::get('/{token}', [PasswordResetController::class, 'showReset'])->name('password.reset');
        });
    });

    Route::get('/', function () {
        return auth()->check()
            ? redirect()->route('home')
            : redirect()->route('login.show');
    });

    Route::any(
        '{query}',
        function () {
            abort_if(auth()->check(), 404);

            return redirect()->route('login.show');
        }
    )->where('query', '.*');
});
