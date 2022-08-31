<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model {
    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'commentReactions',
        'reads',
    ];

    /**
     * The attributes that are mass assignable.
     * 
     * @param array
     */
    protected $fillable = [
        'content',
    ];

    /**
     * The user who created this comment.
     *
     * @return BelongsTo
     */
    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, 'creator_id');
    }

    /**
     * The thread this comment is for.
     *
     * @return BelongsTo
     */
    public function thread(): BelongsTo {
        return $this->belongsTo(Thread::class, 'thread_id');
    }

    /**
     * The reads of this comment.
     *
     * @return MorphMany
     */
    public function reads(): MorphMany {
        return $this->morphMany(Read::class, 'readable');
    }

    /**
     * The comment reactions.
     *
     * @return HasMany
     */
    public function commentReactions(): HasMany {
        return $this->hasMany(CommentReaction::class, 'comment_id');
    }
}
