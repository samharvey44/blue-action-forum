<?php

namespace App\Models;

use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail, CanResetPassword {
    use HasApiTokens, Notifiable, CanResetPasswordTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
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
     * The attributes that are dates.
     * 
     * @var array
     */
    protected $dates = [
        'email_verified_at',
    ];

    /**
     * The role this user has.
     *
     * @return BelongsTo
     */
    public function role(): BelongsTo {
        return $this->belongsTo(Role::class, 'role_id');
    }

    /**
     * This user's profile.
     *
     * @return HasOne
     */
    public function profile(): HasOne {
        return $this->hasOne(Profile::class, 'user_id');
    }

    /**
     * Return whether or not this user has the provided role.
     *
     * @param  string $role The role name to be checked.
     * 
     * @return bool Whether or not this user has the given role.
     */
    public function hasRole(string $role): bool {
        return $this->role->name === $role;
    }
}
