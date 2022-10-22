<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

use App\Http\Requests\Admin\SignupInvitation\GenerateRequest;
use App\Models\SignupInvitation;

class SignupInvitationController extends Controller {
    /**
     * Generate a new signup link and return it.
     *
     * @param GenerateRequest $request
     * 
     * @return JsonResponse
     */
    public function generate(GenerateRequest $request): JsonResponse {
        return response()->json(SignupInvitation::generate());
    }
}
