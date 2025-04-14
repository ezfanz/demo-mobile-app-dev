<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SeatService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;


class SeatController extends Controller
{
    protected $seatService;

    public function __construct(SeatService $seatService)
    {
        $this->seatService = $seatService;
    }

    public function index(): JsonResponse
    {

        /*
         * Get all seats
         * @return JsonResponse
         */
        try {
            return response()->json([
                'status' => true,
                'data' => $this->seatService->getAllSeats()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], $e->getCode() ?: 400);
        }
    }

    public function lock(Request $request)
    {
        return $this->seatService->lockSeat($request);
    }

    public function locked()
    {
        return response()->json($this->seatService->getLockedSeats());
    }
}
