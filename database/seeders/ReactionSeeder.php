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
                'icon_name' => 'ThumbUp',
            ],

            [
                'name' => 'Dislike',
                'icon_name' => 'ThumbDown',
            ],

            [
                'name' => 'Funny',
                'icon_name' => 'Mood',
            ],

            [
                'name' => 'Interesting',
                'icon_name' => 'Lightbulb',
            ],
        ];

        foreach ($reactions as $reaction) {
            Reaction::create($reaction);
        }
    }
}
