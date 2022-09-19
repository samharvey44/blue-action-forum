<?php

namespace App\Models;

use App\Interfaces\IRoles;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Role extends Model implements IRoles {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * The users with this role.
     *
     * @return HasMany
     */
    public function users(): HasMany {
        return $this->hasMany(User::class, 'role_id');
    }

    /**
     * The categories that this role can assign.
     *
     * @return BelongsToMany
     */
    public function categories(): BelongsToMany {
        return $this->belongsToMany(Category::class, 'category_roles', 'role_id', 'category_id')->withTimestamps();
    }
}
