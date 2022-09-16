<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Reaction;

class CommentResource extends JsonResource {
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
            'content' => $this->content,

            'commentReactions' => CommentReactionResource::collection($this->commentReactions),
            'images' => ImageResource::collection($this->images),
            'creator' => UserResource::make($this->creator),
        ];
    }
}
