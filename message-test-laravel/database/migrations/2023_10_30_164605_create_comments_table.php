<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->text('text');

            $table->unsignedBigInteger('user_id');
            $table->index('user_id','comment_user_idx');
            $table->foreign('user_id','comment_user_fk')->on('users')->references('id');

            $table->unsignedBigInteger('parent_comment_id')->nullable();
            $table->index('parent_comment_id','comment_parentComment_idx');
            $table->foreign('parent_comment_id','comment_parentComment_fk')->on('comments')->references('id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
