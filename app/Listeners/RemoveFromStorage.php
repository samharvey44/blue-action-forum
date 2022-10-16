<?php

namespace App\Listeners;

use App\Events\ImageDeleting;

class RemoveFromStorage {
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct() {
        //
    }

    /**
     * Handle the event.
     *
     * @param ImageDeleting  $event
     * 
     * @return void
     */
    public function handle(ImageDeleting $event): void {
        $image = $event->image;

        $image->removeFromStorage();
    }
}
