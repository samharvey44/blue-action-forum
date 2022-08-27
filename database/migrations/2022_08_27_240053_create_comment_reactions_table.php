<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Reaction;
use App\Models\Comment;
use App\Models\User;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('comment_reactions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignIdFor(Reaction::class);
            $table->foreignIdFor(Comment::class);
            $table->foreignIdFor(User::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('comment_reactions');
    }
};
