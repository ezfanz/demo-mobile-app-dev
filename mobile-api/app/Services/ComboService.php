<?php

namespace App\Services;

use App\Repositories\ComboRepository;

class ComboService
{
    protected $comboRepository;

    public function __construct(ComboRepository $comboRepository)
    {
        $this->comboRepository = $comboRepository;
    }

   
}
