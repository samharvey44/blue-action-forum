<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Response;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler {
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'password_confirmation',
        'current_password',
        'password',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register() {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Prepare exception for rendering.
     *
     * @param  Throwable  $e
     * @return Throwable|Response
     */
    public function render($request, Throwable $e) {
        $response = parent::render($request, $e);

        $renderInertiaErrorModal = config('app.render_inertia_error_modal');

        if ($renderInertiaErrorModal) {
            return $response;
        }

        return Inertia::render('Errors/index', ['status' => $response->getStatusCode()])
            ->toResponse($request)
            ->setStatusCode($response->getStatusCode());
    }
}
