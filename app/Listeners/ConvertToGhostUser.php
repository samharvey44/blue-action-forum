<?php

namespace App\Listeners;

use App\Events\UserDeleting;
use App\Models\User;

class ConvertToGhostUser {
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
    public function handle(UserDeleting $event): void {
        $ghostUser = User::ghostUser();
        $user = $event->user->load(['comments', 'threads']);

        $user->comments->each(function ($comment) use ($ghostUser) {
            $comment->creator()->associate($ghostUser);
            $comment->update();
        });

        $user->threads->each(function ($thread) use ($ghostUser) {
            $thread->creator()->associate($ghostUser);
            $thread->update();
        });
    }
}
