<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Http\Requests\Image\IndexRequest;
use App\Models\Image;

class ImageController extends Controller {
    /**
     * Return the create profile page.
     *
     * @param IndexRequest $request
     * @param Image $image
     * 
     * @return BinaryFileResponse
     */
    public function index(IndexRequest $request, Image $image): BinaryFileResponse {
        return $image->getImage();
    }
}
