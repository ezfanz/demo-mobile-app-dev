<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CinemaHallService;
use Illuminate\Http\Request;

class CinemaHallController extends Controller
{
    protected $cinemahallService;

    public function __construct(CinemaHallService $cinemahallService)
    {
        $this->cinemahallService = $cinemahallService;
    }

 
}
