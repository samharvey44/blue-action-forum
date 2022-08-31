<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Profile;
use App\Models\User;

class ProfileSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $desiredUsers = User::whereIn(
            'email',
            [config('user_management.super_user_email'), config('user_management.ghost_user_email')]
        )->get();

        $superProfile = Profile::make([
            'username' => 'super',
        ]);

        $superProfile->user()->associate($desiredUsers->firstWhere('email', config('user_management.super_user_email')));
        $superProfile->save();

        $ghostProfile = Profile::make([
            'username' => 'ghost',
        ]);

        $ghostProfile->user()->associate($desiredUsers->firstWhere('email', config('user_management.ghost_user_email')));
        $ghostProfile->save();
    }
}
