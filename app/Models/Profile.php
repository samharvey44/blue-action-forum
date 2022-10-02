<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model { #
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'location',
        'bio',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'profilePicture',
    ];

    /**
     * The user that owns this profile.
     * 
     * @return BelongsTo
     */
    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * This profile's profile picture.
     *
     * @return MorphOne
     */
    public function profilePicture(): MorphOne {
        return $this->morphOne(Image::class, 'imageable');
    }
}
