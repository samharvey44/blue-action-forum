<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model {
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'icon_name',
        'name',
    ];

    /**
     * The comment reactions.
     *
     * @return HasMany
     */
    public function commentReactions(): HasMany {
        return $this->hasMany(CommentReaction::class, 'reaction_id');
    }
}
