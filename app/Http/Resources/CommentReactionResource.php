<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentReactionResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request): array {
        return [
            'id' => $this->id,

            'reaction' => ReactionResource::make($this->reaction),
            'user' => UserResource::make($this->user),
        ];
    }
}
