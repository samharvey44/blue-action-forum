<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

use App\Http\Resources\CommentResource;
use App\Models\Traits\HasCreator;

use InvalidArgumentException;

class Thread extends Model {
    use HasCreator;

    /**
     * The attributes that are mass assignable.
     * 
     * @param array
     */
    protected $fillable = [
        'title',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'categories',
        'creator',
    ];

    /**
     * The attributes that should be cast to native types.
     * 
     * @var array
     */
    protected $casts = [
        'is_locked' => 'boolean',
        'is_pinned' => 'boolean',
    ];

    /**
     * The number of threads to display per page.
     * 
     * @var int
     */
    public const THREADS_PER_PAGE = 15;

    /**
     * The number of comments to display per page.
     * 
     * @var int
     */
    public const COMMENTS_PER_PAGE = 10;

    /**
     * The comments within this thread.
     *
     * @return HasMany
     */
    public function comments(): HasMany {
        return $this->hasMany(Comment::class, 'thread_id');
    }

    /**
     * The categories for this thread.
     *
     * @return BelongsToMany
     */
    public function categories(): BelongsToMany {
        return $this->belongsToMany(Category::class, 'thread_categories', 'thread_id', 'category_id')->withTimestamps();
    }

    /**
     * Get a query builder of threads based on the current filter.
     * 
     * @param string $filter The filter to retrieve threads by.
     * @param string $search The string to search threads by.
     * 
     * @return Builder The filtered query builder instance.
     */
    public static function getFiltered(string $filter, ?string $search): Builder {
        $query = static::query();

        if ($search) {
            $query = $query->where(function ($sq) use ($search) {
                $sq->where('title', 'LIKE', '%' . $search . '%')
                    ->orWhereHas('comments', function ($ssq) use ($search) {
                        $ssq->where('content', 'LIKE', '%' . $search . '%');
                    });
            });
        }

        return match ($filter) {
            'hot' => $query->withCount([
                'comments' => function ($sq) {
                    $sq->where('created_at', '>=', now()->subHours(3));
                }
            ])->orderByDesc('is_pinned')->orderByDesc('comments_count')->orderByDesc('id'),

            'new' => $query->orderByDesc('is_pinned')->orderByDesc('id'),

            default => throw new InvalidArgumentException('Invalid filter supplied!', 422)
        };
    }

    /**
     * Get the most recent comment on this thread.
     * 
     * @return CommentResource The first comment on this thread.
     */
    public function mostRecentComment(): CommentResource {
        return CommentResource::make(
            $this->comments->sortBy([
                fn ($a, $b) => $a->id <= $b->id,
            ])->first()
        );
    }

    /**
     * Return whether this thread contains unread comments.
     *
     * @return bool Whether this thread contains unread comments for the user.
     */
    public function isUnread(): bool {
        $hasUnreadComment = (bool)$this->comments->filter(fn ($comment) => $comment->isUnread())->count();

        return $hasUnreadComment;
    }
}
