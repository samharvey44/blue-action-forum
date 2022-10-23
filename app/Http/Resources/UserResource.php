<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Role;

use Auth;

class UserResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request): array {
        $user = Auth::user();

        $isAdmin = $user->hasRole(Role::SUPER_ADMIN) || $user->hasRole(Role::ADMIN);

        return [
            'id' => $this->id,
            'createdAt' => $this->created_at,
            'email' => $this->when(
                $this->resource->is($user) || $isAdmin,
                $this->email
            ),
            'lastSeen' => $this->last_seen,
            'isGhost' => $this->email === config('user_management.ghost_user_email'),
            'isSuspended' => $this->when(
                $this->resource->is($user) || $isAdmin,
                $this->is_suspended
            ),

            'role' => RoleResource::make($this->role),
            'profile' => ProfileResource::make($this->profile),
        ];
    }
}
