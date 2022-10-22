<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Role;

use Auth;

class ProfileResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request): array {
        $isAdmin = Auth::user()->hasRole(Role::SUPER_ADMIN) || Auth::user()->hasRole(Role::ADMIN);

        return [
            'id' => $this->id,
            'username' => $this->username,
            'bio' => $this->bio,
            'location' => $this->location,

            'profilePicture' => ImageResource::make($this->profilePicture),
            'isReported' => $this->when($isAdmin, $this->isReported()),
            'isReportedByUser' => $this->isReportedByUser(),
        ];
    }
}
