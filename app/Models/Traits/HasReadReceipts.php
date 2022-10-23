<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Auth;

use App\Models\Read;
use App\Models\User;
use Exception;

trait HasReadReceipts {
    /**
     * The read receipts.
     *
     * @return MorphMany
     */
    public function reads(): MorphMany {
        return $this->morphMany(Read::class, 'readable');
    }

    /**
     * Create a read receipt.
     *
     * @param ?User $by
     * 
     * @return void
     */
    public function markAsRead(?User $by = null): void {
        $rr = Read::make([]);

        $rr->user()->associate($by ?? Auth::user());
        $rr->readable()->associate($this);

        $rr->save();
    }

    /**
     * Return whether this is currently unread.
     *
     * @return bool Whether this has been read by the user.
     */
    public function isUnread(): bool {
        if (!method_exists($this, 'creator')) {
            throw new Exception('Using HasReadReceipts trait on model with no creator relation.');
        }

        return !$this->creator->is(Auth::user()) && !(bool)$this->reads->filter(fn ($read) => $read->isByUser())->count();
    }
}
