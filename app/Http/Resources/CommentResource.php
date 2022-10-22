<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

use App\Models\Role;

use Auth;

class CommentResource extends JsonResource {
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
            'createdAt' => $this->created_at,
            'content' => $this->when(!$this->is_deleted, $this->content),
            'isDeleted' => $this->is_deleted,

            'images' => $this->when(!$this->is_deleted, ImageResource::collection($this->images)),
            'commentReactions' => CommentReactionResource::collection($this->commentReactions),
            'replyingTo' => CommentReplyResource::make($this->replyingTo),
            'isReported' => $this->when($isAdmin, $this->isReported()),
            'creator' => UserResource::make($this->creator),
            'isReportedByUser' => $this->isReportedByUser(),
        ];
    }
}
