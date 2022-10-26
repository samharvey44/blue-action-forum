<?php

namespace App\Console\Commands;

use App\Models\SignupInvitation;

use Illuminate\Console\Command;

class ClearExpiredSignupInvitations extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'signupInvitations:clearExpired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear expired signup invitations from the database.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle() {
        SignupInvitation::where('expires_at', '<', now())
            ->orWhereNotNull('used_at')
            ->delete();

        return Command::SUCCESS;
    }
}
