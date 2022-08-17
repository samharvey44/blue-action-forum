<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected array $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected array $with = [
        'role'
    ];

    /**
     * The role this user has.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role(): BelongsTo {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
