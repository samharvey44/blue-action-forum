<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Relations\MorphMany;

use App\Models\Report;

trait HasReports {
    /**
     * The reports of this class.
     * 
     * @return MorphMany
     */
    public function reports(): MorphMany {
        return $this->morphMany(Report::class, 'reportable');
    }

    /**
     * Return whether this class is currently reported.
     *
     * @return bool Whether this comment is currently reported.
     */
    public function isReported(): bool {
        return (bool)$this->loadMissing('reports')->reports->filter(fn (Report $report) => !$report->is_processed)->count();
    }

    /**
     * Return whether this class has been reported by the authed user.
     *
     * @return bool Whether this class has been reported by the authed user.
     */
    public function isReportedByUser(): bool {
        return (bool)$this->loadMissing('reports')->reports->filter(fn (Report $report) => $report->reportedByUser())->count();
    }
}
