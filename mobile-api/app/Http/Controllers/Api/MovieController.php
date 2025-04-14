<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MovieService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreMovieRequest;

class MovieController extends Controller
{
    protected $movieService;

    public function __construct(MovieService $movieService)
    {
        $this->movieService = $movieService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->movieService->getAllMovies());
    }

    public function show($id)
    {
        try {
            return response()->json([
                'status' => true,
                'data' => $this->movieService->getMovieById($id)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], $e->getCode() ?: 400);
        }
    }
    

    public function store(StoreMovieRequest $request): JsonResponse
    {
        $movie = $this->movieService->createMovie($request->validated());
        return response()->json($movie, 201);
    }

    public function destroy($id): JsonResponse
    {
        $this->movieService->deleteMovie($id);
        return response()->json(['message' => 'Movie deleted successfully.']);
    }
}
