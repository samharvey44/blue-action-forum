<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

use App\Models\Traits\HasCreator;

class Report extends Model {
    use HasFactory, HasCreator;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'is_processed',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'creator',
    ];

    /**
     * The polymorphic reportable relation.
     * 
     * @return MorphTo
     */
    public function reportable(): MorphTo {
        return $this->morphTo();
    }

    /**
     * Store a new report and relate it to the given model.
     *
     * @param Model $model The model to associate the report to.
     * @param ?User $by The user who is making the report.
     * 
     * @return void
     */
    public static function storeAndAssociate(Model $model, ?User $by = null): void {
        $reportModel = static::make([]);

        $reportModel->creator()->associate($by ?? Auth::user());
        $reportModel->reportable()->associate($model);
        $reportModel->save();
    }

    /**
     * Return whether this report was created by the authed user.
     * 
     * @return bool Whether this report was created by the authed user.
     */
    public function reportedByUser(): bool {
        return $this->creator->is(Auth::user());
    }
}
