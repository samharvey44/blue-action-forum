<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\SignupController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\HomeController;

use Illuminate\Support\Facades\Auth;

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
    Route::middleware(['auth', 'user.unsuspended'])->group(function () {
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
            Route::prefix('/create-profile')->group(function () {
                Route::post('/', [ProfileController::class, 'store'])
                    ->middleware('images.optimize')
                    ->name('profile.store');

                Route::get('/', [ProfileController::class, 'index'])->name('profile.create');
            });

            Route::middleware('profile.created')->group(function () {
                Route::get('/images/{image}', [ImageController::class, 'index'])->name('image');

                Route::get('/home', [HomeController::class, 'index'])->name('home');

                Route::prefix('/threads')->group(function () {
                    Route::get('/', [ThreadController::class, 'getPaginated']);

                    Route::prefix('/create')->group(function () {
                        Route::post('/', [ThreadController::class, 'store'])
                            ->middleware('images.optimize')
                            ->name('thread.store');

                        Route::get('/', [ThreadController::class, 'index'])->name('thread.create');
                    });

                    Route::prefix('/{thread}')->group(function () {
                        Route::patch('/toggleLocked', [ThreadController::class, 'toggleLocked'])->middleware('user.isAdmin');
                        Route::patch('/togglePinned', [ThreadController::class, 'togglePinned'])->middleware('user.isAdmin');
                        Route::patch('/toggleFollowing', [ThreadController::class, 'toggleFollowing']);
                        Route::patch('/markAsRead', [ThreadController::class, 'markAsRead']);

                        Route::post('/comment', [CommentController::class, 'store']);

                        Route::get('/{page?}', [ThreadController::class, 'show'])->name('thread.show');
                    });
                });

                Route::prefix('/comments')->group(function () {
                    Route::prefix('/{comment}')->group(function () {
                        Route::patch('/toggleReported', [CommentController::class, 'toggleReported']);
                        Route::put('/react', [CommentController::class, 'react']);

                        Route::delete('/', [CommentController::class, 'markAsDeleted']);
                    });
                });

                Route::prefix('/profiles')->group(function () {
                    Route::prefix('/edit')->group(function () {
                        Route::put('/profilePicture', [ProfileController::class, 'changeProfilePicture']);

                        Route::patch('/', [ProfileController::class, 'update']);
                        Route::get('/', [ProfileController::class, 'edit']);
                    });

                    Route::prefix('/{profile}')->group(function () {
                        Route::patch('/toggleSuspended', [ProfileController::class, 'toggleSuspended'])->middleware('user.isAdmin');
                        Route::patch('/toggleReported', [ProfileController::class, 'toggleReported']);

                        Route::get('/', [ProfileController::class, 'show'])->name('profile.show');
                        Route::delete('/', [ProfileController::class, 'delete']);
                    });
                });
            });

            Route::middleware('user.isAdmin')->group(function () {
                Route::prefix('/admin')->group(function () {
                    Route::get('/', [AdminController::class, 'index']);
                });
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
        return Auth::check()
            ? redirect()->route('home')
            : redirect()->route('login.show');
    });

    Route::any(
        '{query}',
        function () {
            abort_if(Auth::check(), 404);

            return redirect()->route('login.show');
        }
    )->where('query', '.*');
});
