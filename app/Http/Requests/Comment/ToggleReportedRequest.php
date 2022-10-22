<?php

namespace App\Http\Requests\Comment;

use Illuminate\Foundation\Http\FormRequest;

use App\Models\Comment;
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
     * If the authed user has not yet reported this comment, report it.
     * Else, delete the existing report, i.e. unreport it.
     * 
     * @param Comment $comment The comment the report is for.
     * 
     * @return void
     */
    public function createOrDeleteReportFor(Comment $comment): void {
        $reportsByUser = $comment->reports->filter(fn (Report $report) => $report->reportedByUser());

        if ((bool)$reportsByUser->count()) {
            $reportsByUser->each(fn (Report $report) => $report->delete());
        } else {
            Report::storeAndAssociate($comment);
        }
    }
}
