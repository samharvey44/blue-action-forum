<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

use App\Models\Traits\HasReadReceipts;
use App\Models\Traits\HasCreator;

class Comment extends Model {
    use HasCreator, HasReadReceipts;

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'commentReactions',
        'creator',
        'reads',
        'images',
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
     * The thread this comment is for.
     *
     * @return BelongsTo
     */
    public function thread(): BelongsTo {
        return $this->belongsTo(Thread::class, 'thread_id');
    }

    /**
     * The comment reactions.
     *
     * @return HasMany
     */
    public function commentReactions(): HasMany {
        return $this->hasMany(CommentReaction::class, 'comment_id');
    }

    /**
     * The images attached to this comment.
     * 
     * @return MorphMany
     */
    public function images(): MorphMany {
        return $this->morphMany(Image::class, 'imageable');
    }

    /**
     * Return whether this comment is currently unread.
     *
     * @return bool Whether this comment has been read by the user.
     */
    public function isUnread(): bool {
        return !(bool)$this->reads->filter(fn ($read) => $read->isByUser())->count();
    }
}
