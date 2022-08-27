<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Category;
use App\Models\Thread;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('thread_categories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignIdFor(Category::class);
            $table->foreignIdFor(Thread::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('thread_categories');
    }
};
