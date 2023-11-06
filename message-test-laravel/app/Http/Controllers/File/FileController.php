<?php

namespace App\Http\Controllers\File;

use App\Http\Controllers\Controller;
use App\Models\CommentFile;
use App\Services\Image\Service;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public $service;
    public function __construct(Service $serviceGet)
    {
        $this->service = $serviceGet;
        $this->middleware('auth:api', ['except' => ['getTxt']]);
    }
    public function getTxt($id){
        $file =  CommentFile::findOrFail($id);
        $dir = $_SERVER['DOCUMENT_ROOT'];
        $file_path = $dir .'/uploads/'.$file->url;
        $file_content = file_get_contents($file_path);
        return response()->json(['text' => $file_content], 200);
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
