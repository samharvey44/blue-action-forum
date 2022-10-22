<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\Models\Image;

class ImageDeleting {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The image being deleted.
     * 
     * @var Image
     */
    public $image;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Image $image) {
        $this->image = $image;
    }
}
