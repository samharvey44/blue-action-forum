<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReportResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request) {
        return [
            'id' => $this->id,
            'createdAt' => $this->created_at,
            'url' => $this->generateUrl(),
            'isProcessed' => $this->is_processed,
            // We'll strip backslashes first, since this will affect our ability to use quotes in str_replace.
            'reportType' => str_replace('AppModels', '', stripslashes($this->reportable_type)),
            'creator' => UserResource::make($this->reporter),
        ];
    }
}
