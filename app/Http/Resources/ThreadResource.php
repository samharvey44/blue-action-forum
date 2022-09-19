<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request): array {
        return [
            'id' => $this->id,
            'createdAt' => $this->created_at,
            'title' => $this->title,

            'comments' => $this->whenLoaded('comments', fn () => CommentResource::collection($this->comments)),
            'categories' => CategoryResource::collection($this->categories),
            'creator' => UserResource::make($this->creator),
        ];
    }
}
