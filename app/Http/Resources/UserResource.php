<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'email' => $this->when($this->id === auth()->id(), $this->email),

            'role' => RoleResource::make($this->role),
            'profile' => ProfileResource::make($this->profile),
        ];
    }
}
