<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

use App\Models\Traits\HasReadReceipts;
use App\Models\Traits\HasCreator;

use InvalidArgumentException;

class Thread extends Model {
    use HasReadReceipts, HasCreator;
    /**
     * The attributes that are mass assignable.
     * 
     * @param array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'category',
        'reads',
    ];

    /**
     * The number of threads to display per page.
     * 
     * @var int
     */
    public static int $threadsPerPage = 20;

    /**
     * The number of comments to display per page.
     * 
     * @var int
     */
    public static int $commentsPerPage = 15;


    /**
     * The number of comments to display per page within a thread.
     * 
     * @var int
     */
    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, 'creator_id');
    }

    /**
     * The comments within this thread.
     *
     * @return HasMany
     */
    public function comments(): HasMany {
        return $this->hasMany(Comment::class, 'thread_id');
    }

    /**
     * The reads of this thread.
     *
     * @return MorphMany
     */
    public function reads(): MorphMany {
        return $this->morphMany(Read::class, 'readable');
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
     * 
     * @return Builder The filtered query builder instance.
     */
    public static function getFiltered(string $filter): Builder {
        $query = static::query();

        switch ($filter) {
            case ('hot'): {
                    $results = DB::table('threads')
                        ->select('threads.id')
                        ->leftJoin('comments', 'comments.thread_id', '=', 'threads.id')
                        ->groupBy('threads.id')
                        ->orderByRaw('(MAX(comments.created_at) >= DATE_SUB(NOW(), INTERVAL 3 HOUR)) DESC')
                        ->get();

                    $mappedIds = $results->map(fn ($item) => $item->id)->toArray();
                    $implodedIds = implode(',', $mappedIds);

                    // Ensure that the order is retained, as otherwise whereIn reverts to ordering by ascending IDs.
                    $query = $query->whereIn('id', $mappedIds)->orderByRaw("FIELD(id, {$implodedIds})");
                }

            case ('new'): {
                    $query = $query->orderByDesc('id');

                    break;
                }

            default: {
                    throw new InvalidArgumentException('Invalid filter supplied!', 422);
                }
        }

        return $query;
    }
}
