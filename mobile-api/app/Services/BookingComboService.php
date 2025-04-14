<?php

namespace App\Services;

use App\Repositories\BookingComboRepository;

class BookingComboService
{
    protected $bookingcomboRepository;

    public function __construct(BookingComboRepository $bookingcomboRepository)
    {
        $this->bookingcomboRepository = $bookingcomboRepository;
    }

    
}
