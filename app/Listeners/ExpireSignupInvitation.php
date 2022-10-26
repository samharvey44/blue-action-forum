<?php

namespace App\Listeners;

use App\Events\SignupInvitationUsed;

class ExpireSignupInvitation {
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
     * @param  object  $event
     * @return void
     */
    public function handle(SignupInvitationUsed $event) {
        $event->signupInvitation->expire();
    }
}
