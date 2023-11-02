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
        Schema::create('comment_files', function (Blueprint $table) {
            $table->id();
            $table->string('url');

            $table->unsignedBigInteger('comment_id')->nullable();
            $table->index('comment_id','file_comment_idx');
            $table->foreign('comment_id','file_comment_fk')->on('comments')->references('id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comment_files');
    }
};
