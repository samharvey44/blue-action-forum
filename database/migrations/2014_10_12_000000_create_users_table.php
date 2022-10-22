<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

use App\Models\Role;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('password');
            // The forum is currently invite only and therefore doesn't need email validation.
            // We'll leave the column here in case this changes in future.
            $table->dateTime('email_verified_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->dateTime('last_seen')->nullable();
            $table->boolean('is_suspended')->default(false);

            $table->foreignIdFor(Role::class);

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('users');
    }
};
