<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

use Closure;
use Auth;

class UserNotSuspended {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next) {
        if (!Auth::check()) {
            return $next($request);
        }

        if (!Auth::user()->is_suspended) {
            return $next($request);
        }

        session()->invalidate();
        Auth::logout();

        return redirect()->to('/')->withErrors([
            'suspended' => 'Your account has been suspended by an administrator.'
        ]);
    }
}
