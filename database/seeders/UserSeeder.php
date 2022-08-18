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
        $user = User::make([
            'name' => 'Sam Harvey',
            'email' => 'samuelharvey15@hotmail.com',
            'password' => bcrypt('password'),
        ]);

        $user->role()->associate(Role::where('name', 'Super Admin')->first());

        $user->save();
    }
}
