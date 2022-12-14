<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

use Auth;

class Category extends Model {
    /**
     * The attributes that are mass assignable,
     *
     * @var array
     */
    protected $fillable = [
        'display_color',
        'name',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'roles',
    ];

    /**
     * The threads in this category.
     *
     * @return BelongsToMany
     */
    public function threads(): BelongsToMany {
        return $this->belongsToMany(Thread::class, 'thread_categories', 'category_id', 'thread_id')->withTimestamps();
    }

    /**
     * The roles that can assign this category.
     *
     * @return BelongsToMany
     */
    public function roles(): BelongsToMany {
        return $this->belongsToMany(Role::class, 'category_roles', 'category_id', 'role_id')->withTimestamps();
    }

    /**
     * Get the categories the authed user can assign.
     *
     * @return Collection
     */
    public static function assignableByUser(): Collection {
        return self::whereRelation('roles', 'roles.id', Auth::user()->role->id)->get();
    }
}
