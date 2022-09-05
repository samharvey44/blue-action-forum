<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Category;

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
            ],
            [
                'name' => 'Chants',
                'display_color' => '#F64740',
            ]
        ] as $category) {
            Category::create($category);
        }
    }
}
