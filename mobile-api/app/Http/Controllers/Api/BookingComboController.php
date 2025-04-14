<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BookingComboService;
use Illuminate\Http\Request;

class BookingComboController extends Controller
{
    protected $bookingcomboService;

    public function __construct(BookingComboService $bookingcomboService)
    {
        $this->bookingcomboService = $bookingcomboService;
    }

   
}
