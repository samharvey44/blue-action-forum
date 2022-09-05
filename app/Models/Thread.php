<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

use App\Models\Traits\HasCreator;

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
        return $this->belongsToMany(Category::class, 'thread_categories', 'thread_id', 'category_id');
    }
}
