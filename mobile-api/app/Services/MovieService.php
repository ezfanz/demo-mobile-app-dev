<?php

namespace App\Services;

use App\Repositories\MovieRepository;

class MovieService extends BaseService
{
    protected $movieRepository;

    public function __construct(MovieRepository $movieRepository)
    {
        $this->movieRepository = $movieRepository;
    }

    public function getAllMovies()
    {
        return $this->movieRepository->getAll();
    }

    public function getMovieById($id)
    {
        $movie = $this->movieRepository->find($id);

        return $this->guardModelOrFail($movie, "Movie not found");
    }

    public function createMovie(array $data)
    {
        return $this->movieRepository->create($data);
    }

    public function deleteMovie($id)
    {
        return $this->movieRepository->delete($id);
    }
}
