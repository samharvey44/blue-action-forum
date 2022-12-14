<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Comment;
use App\Models\Thread;
use App\Models\User;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->boolean('is_deleted')->default(false);
            $table->text('content');

            $table->foreignIdFor(Comment::class, 'replying_to')->nullable();
            $table->foreignIdFor(User::class, 'creator_id');
            $table->foreignIdFor(Thread::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('comments');
    }
};
