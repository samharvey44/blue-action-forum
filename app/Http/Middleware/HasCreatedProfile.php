<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

use Closure;
use Auth;

class HasCreatedProfile {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next) {
        if (!Auth::check()) {
            return redirect()->route('login.show');
        }

        if (!Auth::user()->hasCreatedProfile()) {
            return redirect()->route('profile.create')->withErrors([
                'profile' => 'You must create a profile before proceeding.',
            ]);
        }

        return $next($request);
    }
}
