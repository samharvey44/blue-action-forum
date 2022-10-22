<?php

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
        Schema::create('signup_invitations', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->uuid('invitation_token')->unique();
            $table->dateTime('expires_at');
            $table->dateTime('used_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('signup_invitations');
    }
};
