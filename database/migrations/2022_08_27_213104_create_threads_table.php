<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\User;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('threads', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('title');
            $table->boolean('is_locked')->default(false);
            $table->boolean('is_pinned')->default(false);

            $table->foreignIdFor(User::class, 'creator_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('threads');
    }
};
