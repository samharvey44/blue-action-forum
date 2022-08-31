<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Model;

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
}
