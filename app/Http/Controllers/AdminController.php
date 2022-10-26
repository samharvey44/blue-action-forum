<?php

namespace App\Http\Controllers;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Inertia\Response;
use Inertia\Inertia;

use App\Http\Requests\Admin\Reports\ToggleProcessedRequest;
use App\Http\Requests\Admin\Reports\GetReportsRequest;
use App\Http\Requests\Admin\Users\GetUsersRequest;
use App\Http\Requests\Admin\IndexRequest;
use App\Http\Resources\UserResource;
use App\Models\Report;
use App\Models\User;

class AdminController extends Controller {
    /**
     * Return the admin page.
     *
     * @param IndexRequest $request
     * 
     * @return Response
     */
    public function index(IndexRequest $request): Response {
        return Inertia::render('Authed/Admin/index');
    }

    /**
     * Get a paginated collection of users.
     * 
     * @param GetUsersRequest $request
     * 
     * @return AnonymousResourceCollection
     */
    public function getUsers(GetUsersRequest $request): AnonymousResourceCollection {
        return UserResource::collection(
            User::undeleted()
                ->where('email', 'LIKE', '%' . $request->get('search') . '%')
                ->orWhereHas('profile', fn ($sq) => $sq->where('username', 'LIKE', '%' . $request->get('search') . '%'))
                ->orderByDesc('id')
                ->paginate($request->get('rowsPerPage'))
        );
    }

    /**
     * Get a paginated collection of reports.
     * 
     * @param GetReportsRequest $request
     * 
     * @return AnonymousResourceCollection
     */
    public function getReports(GetReportsRequest $request): AnonymousResourceCollection {
        return Report::getPaginatedCollection(
            $request->get('processedFilter'),
            $request->get('page'),
            $request->get('rowsPerPage')
        );
    }

    /**
     * Toggle the processed status of the given report.
     * 
     * @param ToggleProcessedRequest $request
     * @param Report $report
     * 
     * @return AnonymousResourceCollection
     */
    public function toggleProcessed(ToggleProcessedRequest $request, Report $report): AnonymousResourceCollection {
        $report->toggleProcessed();

        return Report::getPaginatedCollection(
            $request->get('processedFilter'),
            $request->get('page'),
            $request->get('rowsPerPage')
        );
    }
}
