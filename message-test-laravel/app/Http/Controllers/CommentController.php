<?php

namespace App\Http\Controllers;

use App\Http\Requests\Comment\StoreRequest;
use App\Http\Requests\Comment\UpdateRequest;
use App\Http\Resources\Comment\CommentResource;
use App\Models\Comment;
use App\Models\CommentFile;

class CommentController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Comment"},
     *     path="/api/comments",
     *   security={{ "bearerAuth": {} }},
     *     @OA\Response(response="200", description="List Categories.")
     * )
     */
    public function index()
    {
        $comments = Comment::where('parent_comment_id',null)->orderByDesc('id')->paginate(25);
        return CommentResource::collection($comments);
    }

    /**
     * @OA\Post(
     *     tags={"Comment"},
     *     path="/api/comments",
     *     security={{ "bearerAuth": {} }},
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"text","user_id"},
     *                 @OA\Property(
     *                     property="text",
     *                     type="string",
     *                     format="string"
     *                 ),
     *                 @OA\Property(
     *                     property="user_id",
     *                     type="integer"
     *                 ),
     *                 @OA\Property(
     *                     property="parent_comment_id",
     *                     type="integer"
     *                 ),
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Add Category.")
     * )
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $comment = Comment::create($data);
        if(isset($data['files'])) {
            $ids = array_map(function ($item) {
                return $item['id'];
            }, $data['files']);
            CommentFile::whereIn('id', $ids)->update(['comment_id' => $comment->id]);
        }
        return CommentResource::make($comment);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        return CommentResource::make($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Comment $comment)
    {
        $data = $request->validated();
        $comment->update($data);
        return CommentResource::make($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json(['message'=>'done']);
    }
}
