<?php

namespace Database\Seeders;

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

        $user = User::make([
            'name' => 'Super',
            'email' => 'super@thecollective.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        $user->role()->associate(Role::firstWhere('name', Role::SUPER_ADMIN));

        $user->save();
    }
}
