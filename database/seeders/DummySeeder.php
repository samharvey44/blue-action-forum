<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Profile;
use App\Models\Thread;
use App\Models\Role;
use App\Models\User;

class DummySeeder extends Seeder {
    /**
     * The array of created records.
     * 
     * @param array
     */
    private array $createdRecords = [];

    /**
     * Seed dummy users into the database.
     * 
     * @return void
     */
    private function seedUsers(): void {
        $roles = Role::all();

        $users = User::factory()
            ->count(20)
            ->make()
            ->each(function (User $user) use ($roles) {
                $user->role()->associate($roles->random());
                $user->save();
            });

        $this->createdRecords['users'] = $users;
    }

    /**
     * Seed dummy profiles into the database.
     * 
     * @return void
     */
    private function seedProfiles(): void {
        $users = $this->createdRecords['users']->filter(function (User $user) {
            return $user->hasRole(Role::USER);
        });
        $collect = collect();

        foreach ($users as $user) {
            $profile = Profile::factory()->for($user)->create();

            $collect->push($profile);

            $this->createdRecords['profiles'][] = $collect;
        }
    }

    /**
     * Seed dummy threads into the database.
     * 
     * @return void
     */
    private function seedThreads(): void {
        $categories = Category::all();
        $collect = collect();

        Thread::factory()
            ->count(30)
            ->make()
            ->each(function (Thread $thread) use ($categories, &$collect) {
                $thread->creator()->associate($this->createdRecords['users']->random());
                $thread->save();

                $thread->categories()->attach(
                    $categories->filter(fn () => rand(0, 1) === 0)->map->id
                );

                $collect->push($thread);
            });

        $this->createdRecords['threads'] = $collect;
    }

    /**
     * Seed dummy comments into the database.
     * 
     * @return void
     */
    private function seedComments(): void {
        $comments = Comment::factory()
            ->count(100)
            ->make()
            ->each(function (Comment $comment) {
                $comment->thread()->associate($this->createdRecords['threads']->random());
                $comment->creator()->associate($this->createdRecords['users']->random());

                $comment->save();
            });

        $this->createdRecords['comments'] = $comments;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $this->seedUsers();
        $this->seedProfiles();
        $this->seedThreads();
        $this->seedComments();
    }
}
