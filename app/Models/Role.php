<?php

namespace App\Models;

use App\Interfaces\IRoles;

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
}
