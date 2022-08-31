<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'location' => $this->location,

            'profilePicture' => ImageResource::make($this->profilePicture),
        ];
    }
}
