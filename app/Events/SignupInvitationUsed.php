<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\Models\SignupInvitation;

class SignupInvitationUsed {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The signup invitation that has been used.
     * 
     * @var SignupInvitation
     */
    public $signupInvitation;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(SignupInvitation $signupInvitation) {
        $this->signupInvitation = $signupInvitation;
    }
}
