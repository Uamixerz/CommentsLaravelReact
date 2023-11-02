<?php

namespace App\Http\Controllers\File;

use App\Http\Controllers\Controller;
use App\Services\Image\Service;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public $service;
    public function __construct(Service $serviceGet)
    {
        $this->service = $serviceGet;
    }

    public function store(Request $request)
    {
        if ($request->hasFile('file')) {
            $req = $this->service->store($request->file('file'));
            return response()->json($req);
        }
        return response()->json(['message' => 'No file uploaded'], 400);
    }
}
