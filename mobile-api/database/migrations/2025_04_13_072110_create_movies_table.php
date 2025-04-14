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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('release_date')->nullable();
            $table->integer('duration')->nullable(); // in minutes
            $table->float('rating')->default(0);
            $table->string('age_rating')->nullable(); // e.g., "15+"
            $table->string('genres')->nullable(); // or use JSON if multiple
            $table->text('casts')->nullable();
            $table->string('director')->nullable();
            $table->text('writers')->nullable();
            $table->string('trailer_url')->nullable();
            $table->string('poster_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
