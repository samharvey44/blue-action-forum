<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Reaction;

class ReactionSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $reactions = [
            [
                'name' => 'Like',
                'icon_path' => 'thumbup.svg',
            ],

            [
                'name' => 'Dislike',
                'icon_path' => 'thumbdown.svg',
            ],

            [
                'name' => 'Laugh',
                'icon_path' => 'laugh.svg',
            ],

            [
                'name' => 'Interesting',
                'icon_path' => 'lightbulb.svg',
            ],
        ];

        foreach ($reactions as $reaction) {
            Reaction::create($reaction);
        }
    }
}
