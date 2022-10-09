<?php

namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword as ResettablePassword;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail, ResettablePassword {
    use HasApiTokens, Notifiable, CanResetPassword, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'profile',
        'role',
    ];

    /**
     * The attributes that are dates.
     * 
     * @var array
     */
    protected $dates = [
        'email_verified_at',
        'last_seen',
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
     * The threads this user has created.
     *
     * @return HasMany
     */
    public function threads(): HasMany {
        return $this->hasMany(Thread::class, 'creator_id');
    }

    /**
     * The comments this user has created.
     *
     * @return HasMany
     */
    public function comments(): HasMany {
        return $this->hasMany(Comment::class, 'creator_id');
    }

    /**
     * The read records for this user.
     *
     * @return HasMany
     */
    public function reads(): HasMany {
        return $this->hasMany(Read::class, 'user_id');
    }

    /**
     * The threads this user is following.
     *
     * @return BelongsToMany
     */
    public function threadsFollowing(): BelongsToMany {
        return $this->belongsToMany(Thread::class, 'thread_follows', 'user_id', 'thread_id')->withTimestamps();
    }

    /**
     * Return whether or not this user has the provided role.
     *
     * @param string $role The role name to be checked.
     * 
     * @return bool Whether or not this user has the given role.
     */
    public function hasRole(string $role): bool {
        return $this->role->name === $role;
    }

    /**
     * Return whether or not this user has created a profile.
     *
     * @return bool Whether or not this user has created a profile.
     */
    public function hasCreatedProfile(): bool {
        return (bool)$this->profile;
    }

    /**
     * Return whether this user is following the given thread.
     * 
     * @param Thread $thread The thread to check follows for.
     * 
     * @return bool Whether the user is following the thread.
     */
    public function isFollowing(Thread $thread): bool {
        return (bool)$this->threadsFollowing->where('id', $thread->id)->count();
    }
}
