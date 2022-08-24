<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

use Closure;

class HasCreatedProfile {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next) {
        $user = auth()->user();

        if (!(bool)$user) {
            return redirect()->route('login.show');
        }

        if (!(bool)$user->profile) {
            return redirect()->route('profile.create')->withErrors([
                'profile' => 'You must create a profile before proceeding.',
            ]);
        }

        return $next($request);
    }
}
