<?php

namespace App\Models;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

use App\Http\Resources\ReportResource;
use App\Models\Traits\HasCreator;

use InvalidArgumentException;

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
     * The attributes that should be cast to native types.
     * 
     * @var array
     */
    protected $casts = [
        'is_processed' => 'boolean',
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

    /**
     * Generate the URL for the report.
     *      
     * @return string The URL for the report.
     */
    public function generateUrl(): string {
        $reportable = $this->reportable;
        $url = '';

        switch ($reportable::class) {
            case Comment::class: {
                    $thread = $reportable->thread->load('comments');
                    $commentIndex = $thread->comments->values()->search(
                        fn ($comment) => $comment->id === $reportable->id
                    );

                    $page = ceil(($commentIndex + 1) / Thread::COMMENTS_PER_PAGE);

                    $url = route('thread.show', ['thread' => $thread->id, 'page' => $page]);

                    break;
                }

            case Profile::class: {
                    $url = route('profile.show', ['profile' => $reportable->id]);

                    break;
                }

            default: {
                    throw new InvalidArgumentException('Unhandled relation for URL!');
                }
        }

        return $url;
    }

    /**
     * Toggle the processed status of this report.
     * 
     * @return void
     */
    public function toggleProcessed(): void {
        $this->update(['is_processed' => !$this->is_processed]);
    }

    /**
     * Get a paginated collection of reports for the admin area.
     * 
     * @param ?bool $filter The processed status filter.
     * @param int $page The page for pagination.
     * @param int $rowsPerPage The rows per page for pagination.
     * 
     * @return AnonymousResourceCollection The collection of reports.
     */
    public static function getPaginatedCollection(?bool $filter, int $page, int $rowsPerPage): AnonymousResourceCollection {
        $query = is_null($filter)
            ? self::query()
            : self::where('is_processed', $filter);

        return ReportResource::collection(
            $query->with('reportable')
                ->orderByDesc('id')
                ->paginate($rowsPerPage, page: $page)
                ->loadMorph('reportable', [
                    Comment::class => ['thread'],
                ])
        );
    }
}
