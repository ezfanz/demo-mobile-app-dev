<?php

use App\Http\Controllers\Api\SeatController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MovieController;


/**
 * Movies
 */
Route::get('/movies', [MovieController::class, 'index']);
Route::get('/movies/{id}', [MovieController::class, 'show']);


/**
 * Seats
 */
Route::get('/seats', [SeatController::class, 'index']);
Route::get('/seats/{id}', [SeatController::class, 'show']);
Route::post('/lock-seat', [SeatController::class, 'lock']);
Route::get('/locked-seats', [SeatController::class, 'locked']);



