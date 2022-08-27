<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class CommentReaction extends Model {
    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'reaction',
        'user',
    ];

    /**
     * The user leaving a comment reaction.
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * The comment being reacted to.
     *
     * @return BelongsTo
     */
    public function comment(): BelongsTo {
        return $this->belongsTo(Comment::class, 'comment_id');
    }

    /**
     * The reaction being left.
     *
     * @return BelongsTo
     */
    public function reaction(): BelongsTo {
        return $this->belongsTo(Reaction::class, 'reaction_id');
    }
}
