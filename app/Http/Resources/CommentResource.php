<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
            'content' => $this->when(!$this->is_deleted, $this->content),
            'isDeleted' => $this->is_deleted,

            'images' => $this->when(!$this->is_deleted, ImageResource::collection($this->images)),
            'commentReactions' => CommentReactionResource::collection($this->commentReactions),
            'replyingTo' => CommentReplyResource::make($this->replyingTo),
            'creator' => UserResource::make($this->creator),
        ];
    }
}
