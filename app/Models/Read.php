<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Read extends Model {
    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'user',
    ];

    /**
     * The polymorphic readable relation.
     *
     * @return MorphTo
     */
    public function readable(): MorphTo {
        return $this->morphTo();
    }

    /**
     * The user this read is for.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Return whether this read is by the authed user.
     * 
     * @return bool Whether this read is by the authed user.
     */
    public function isByUser(): bool {
        return $this->user->is(Auth::user());
    }
}
