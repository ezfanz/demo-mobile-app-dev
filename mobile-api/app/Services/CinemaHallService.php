<?php

namespace App\Services;

use App\Repositories\CinemaHallRepository;

class CinemaHallService
{
    protected $cinemahallRepository;

    public function __construct(CinemaHallRepository $cinemahallRepository)
    {
        $this->cinemahallRepository = $cinemahallRepository;
    }

    
}
