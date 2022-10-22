<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

use App\Models\Role;

use Closure;
use Auth;

class UserIsAdmin {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next) {
        $user = Auth::user();
        $isAdmin = $user?->hasRole(Role::SUPER_ADMIN) || $user?->hasRole(Role::ADMIN);

        if ($isAdmin) {
            return $next($request);
        }

        abort_if($request->ajax(), 403, 'You are not permitted to access this!');

        return back()->withErrors(['role' => 'You are not permitted to access this!']);
    }
}
