<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

use App\Models\Traits\HasReadReceipts;
use App\Models\Traits\HasCreator;

class Comment extends Model {
    use HasCreator, HasReadReceipts, HasFactory;

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'commentReactions',
        'replyingTo',
        'reports',
        'creator',
        'images',
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
     * The attributes that should be cast to native types.
     * 
     * @param array
     */
    protected $casts = [
        'is_deleted' => 'boolean',
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
     * The comment that this comment is a reply to.
     * 
     * @return BelongsTo
     */
    public function replyingTo(): BelongsTo {
        return $this->belongsTo(self::class, 'replying_to');
    }

    /**
     * The replies to this comment.
     * 
     * @return HasMany
     */
    public function replies(): HasMany {
        return $this->hasMany(self::class, 'replying_to');
    }

    /**
     * The reports of this comment.
     * 
     * @return MorphMany
     */
    public function reports(): MorphMany {
        return $this->morphMany(Report::class, 'reportable');
    }

    /**
     * Return whether this comment is currently unread.
     *
     * @return bool Whether this comment has been read by the user.
     */
    public function isUnread(): bool {
        return !$this->creator->is(Auth::user()) && !(bool)$this->reads->filter(fn ($read) => $read->isByUser())->count();
    }

    /**
     * Return whether this comment is currently reported.
     *
     * @return bool Whether this comment is currently reported.
     */
    public function isReported(): bool {
        return (bool)$this->reports->filter(fn (Report $report) => !$report->is_processed)->count();
    }

    /**
     * Return whether this comment has been reported by the authed user.
     *
     * @return bool Whether this comment has been reported by the authed user.
     */
    public function isReportedByUser(): bool {
        return (bool)$this->reports->filter(fn (Report $report) => $report->reportedByUser())->count();
    }
}
