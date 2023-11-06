<?php

namespace App\Http\Resources\Comment;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'user'=> ['name'=>$this->user->name, 'image' => $this->user->image, 'homepage' => $this->user->homepage, 'email' => $this->user->email],
            'parent_comment_id' => $this->parent_comment_id,
            'comment_child' => $this->commentChild,
            'files' => $this->files,
            'created_at' => $this->created_at
        ];
    }


}
