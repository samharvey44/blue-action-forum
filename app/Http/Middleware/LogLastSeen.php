<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

use Closure;
use Auth;

class LogLastSeen {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next) {
        $returnNext = $next($request);

        if (!Auth::check()) {
            return $returnNext;
        }

        $cacheKey = Auth::id() . 'last-online';

        // If we've got a valid last online status, we won't update it.
        if (Cache::has($cacheKey)) {
            return $returnNext;
        }

        $user = User::find(Auth::id());

        if (!$user) {
            return $returnNext;
        }

        $user->forceFill(['last_seen' => now()]);
        $user->update();

        Cache::put($cacheKey, true, now()->addMinutes(1));

        return $returnNext;
    }
}
