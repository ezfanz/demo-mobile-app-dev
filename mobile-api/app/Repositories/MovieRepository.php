<?php

namespace App\Repositories;

use App\Models\Movie;

class MovieRepository
{
    public function getAll()
    {
        return Movie::all();
    }

    public function find($id)
    {
        return Movie::find($id);
    }

    public function create(array $data)
    {
        return Movie::create($data);
    }

    public function delete($id)
    {
        return Movie::destroy($id);
    }
}
