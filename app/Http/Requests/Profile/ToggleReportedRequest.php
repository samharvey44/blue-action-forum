<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\Profile;
use App\Models\Report;
use Auth;

class ToggleReportedRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array {
        return [
            //
        ];
    }

    /**
     * If the authed user has not yet reported this profile, report it.
     * Else, delete the existing report, i.e. unreport it.
     * 
     * @param Profile $profile The profile the report is for.
     * 
     * @return bool The consequent reported status of the profile.
     */
    public function createOrDeleteReportFor(Profile $profile): bool {
        $reportsByUser = $profile->reports->filter(fn (Report $report) => $report->reportedByUser());

        if ((bool)$reportsByUser->count()) {
            $reportsByUser->each(fn (Report $report) => $report->delete());
        } else {
            Report::storeAndAssociate($profile);
        }

        return $profile->isReportedByUser();
    }
}
