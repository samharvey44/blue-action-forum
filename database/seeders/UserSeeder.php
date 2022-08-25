<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

use App\Models\Role;
use App\Models\User;

class UserSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        if (config('app.env') !== 'local') {
            return;
        }

        $superUser = User::make([
            'name' => 'Super',
            'email' => config('user_management.super_user_email'),
            'password' => Hash::make(config('user_management.super_user_password')),
            'email_verified_at' => now(),
        ]);

        $superUser->role()->associate(Role::firstWhere('name', Role::SUPER_ADMIN));
        $superUser->save();

        $ghostUser = User::make([
            'name' => '[Deleted]',
            'email' => config('user_management.ghost_user_email'),
            'password' => Hash::make(config('user_management.ghost_user_password')),
            'email_verified_at' => now(),
        ]);

        $ghostUser->role()->associate(Role::firstWhere('name', Role::USER));
        $ghostUser->save();
    }
}
