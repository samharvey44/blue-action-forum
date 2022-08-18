<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('first_name');
            $table->string('last_name');
            $table->string('location')->nullable();

            $table->foreignIdFor(User::class);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('profiles');
    }
};
