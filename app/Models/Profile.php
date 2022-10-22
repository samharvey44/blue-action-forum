<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

use App\Events\ImageDeleting;

class Profile extends Model {
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * 
     * @var array
     */
    protected $fillable = [
        'location',
        'bio',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = [
        'profilePicture',
    ];

    /**
     * The user that owns this profile.
     * 
     * @return BelongsTo
     */
    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * This profile's profile picture.
     *
     * @return MorphOne
     */
    public function profilePicture(): MorphOne {
        return $this->morphOne(Image::class, 'imageable');
    }

    /**
     * The reports of this profile.
     * 
     * @return MorphMany
     */
    public function reports(): MorphMany {
        return $this->morphMany(Report::class, 'reportable');
    }

    /**
     * Return whether this comment is currently reported.
     *
     * @return bool Whether this comment is currently reported.
     */
    public function isReported(): bool {
        return (bool)$this->load('reports')->reports->filter(fn (Report $report) => !$report->is_processed)->count();
    }

    /**
     * Return whether this comment has been reported by the authed user.
     *
     * @return bool Whether this comment has been reported by the authed user.
     */
    public function isReportedByUser(): bool {
        return (bool)$this->load('reports')->reports->filter(fn (Report $report) => $report->reportedByUser())->count();
    }

    /**
     * Change this profile's profile picture.
     * 
     * @param ?UploadedFile $newPicture the new profile picture, or null if we are removing an existing one.
     * 
     * @return void
     */
    public function changeProfilePicture(?UploadedFile $newPicture): void {
        $current = $this->profilePicture;

        if ((bool)$current) {
            ImageDeleting::dispatch($current);

            $current->delete();
        }

        // If there's no uploaded picture, we're just removing our existing one.
        if (is_null($newPicture)) {
            return;
        }

        Image::storeAndAssociate($newPicture, $this);
    }
}
