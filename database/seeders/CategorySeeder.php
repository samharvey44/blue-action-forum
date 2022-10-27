<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Category;
use App\Models\Role;

class CategorySeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        foreach ([
            [
                'name' => 'General',
                'display_color' => '#C4D6B0',
                'roles' => [
                    Role::SUPER_ADMIN,
                    Role::ADMIN,
                    Role::USER,
                ],
            ],
            [
                'name' => 'Announcements',
                'display_color' => '#736372',
                'roles' => [
                    Role::SUPER_ADMIN,
                    Role::ADMIN,
                ],
            ],
            [
                'name' => 'New Chants',
                'display_color' => '#F64740',
                'roles' => [
                    Role::SUPER_ADMIN,
                    Role::ADMIN,
                    Role::USER,
                ],
            ],
            [
                'name' => 'Match Talk',
                'display_color' => '#136F63',
                'roles' => [
                    Role::SUPER_ADMIN,
                    Role::ADMIN,
                    Role::USER,
                ],
            ],
            [
                'name' => 'Opinion',
                'display_color' => '#3C0000',
                'roles' => [
                    Role::SUPER_ADMIN,
                    Role::ADMIN,
                    Role::USER,
                ],
            ],
            [
                'name' => 'Issues',
                'display_color' => '#870058',
                'roles' => [
                    Role::SUPER_ADMIN,
                    Role::ADMIN,
                    Role::USER,
                ],
            ],
            [
                'name' => 'Maintenance',
                'display_color' => '#3FA7D6',
                'roles' => [
                    Role::SUPER_ADMIN,
                ],
            ],
        ] as $category) {
            $roles = Role::all();

            $newCategory = Category::create([
                'name' => $category['name'],
                'display_color' => $category['display_color'],
            ]);

            $newCategory->roles()->attach(
                $roles->filter(fn ($role) => in_array($role->name, $category['roles']))->map->id
            );
        }
    }
}
