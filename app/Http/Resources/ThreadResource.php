<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use Auth;

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
            'title' => $this->title,
            'isLocked' => $this->is_locked,
            'isPinned' => $this->is_pinned,
            'isUnread' => $this->isUnread(),
            'createdAt' => $this->created_at,
            'userIsFollowing' => Auth::user()->load('threadsFollowing')->isFollowing($this->resource),

            'mostRecentComment' => $this->whenLoaded('comments', fn () => $this->mostRecentComment()),
            'categories' => CategoryResource::collection($this->categories),
            'creator' => UserResource::make($this->creator),
        ];
    }
}
