<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\User;

trait HasCreator {
    /**
     * The creator of this model.
     *
     * @return BelongsTo
     */
    public function creator(): BelongsTo {
        return $this->belongsTo(User::class, 'creator_id');
    }

    /**
     * Associate the creator for this model.
     *
     * @param User $user The user to associate as creator.
     * 
     * @return void
     */
    public function storeCreator(User $user): void {
        $this->creator()->associate($user);
    }
}
