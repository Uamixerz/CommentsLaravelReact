<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'parent_comment_id', 'id')->with('files');
    }

    public function commentChild()
    {
        //return $this->comments()->with('files')->with('commentChild')->with('user->name');
        return $this->comments()->with(['files', 'commentChild', 'user' => function ($query) {
            $query->select('name', 'image', 'id', 'homepage'); // Вибираємо тільки потрібні поля
        }]);
    }

    public function files()
    {
        return $this->hasMany(CommentFile::class, 'comment_id', 'id')->select('id', 'url', 'comment_id');
    }


    protected $fillable = ['text', 'user_id', 'parent_comment_id'];
}
