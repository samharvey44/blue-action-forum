<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'role',
        'profile',
    ];

    /**
     * The role this user has.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role(): BelongsTo {
        return $this->belongsTo(Role::class, 'role_id');
    }

    /**
     * This user's profile.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function profile(): HasOne {
        return $this->hasOne(Profile::class, 'user_id');
    }
}
