<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;

class Category extends Model {
    /**
     * The attributes that are mass assignable,
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'display_color',
    ];

    /**
     * The threads in this category.
     *
     * @return BelongsToMany
     */
    public function threads(): BelongsToMany {
        return $this->belongsToMany(Thread::class, 'thread_categories', 'category_id', 'thread_id');
    }
}
