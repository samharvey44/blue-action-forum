<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel {
    /**
     * The commands to be registered.
     * 
     * @param array
     */
    protected $commands = [
        \jdavidbakr\LaravelCacheGarbageCollector\LaravelCacheGarbageCollector::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule) {
        $schedule->command('cache:gc')->dailyAt('3:00');

        $schedule->command('signupInvitations:clearExpired')->dailyAt('3:15');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands() {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
