<?php

namespace App\Services;

use App\Repositories\SeatRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SeatService
{
    protected $seatRepository;

    public function __construct(SeatRepository $seatRepository)
    {
        $this->seatRepository = $seatRepository;
    }

    public function getAllSeats()
    {
        return $this->seatRepository->getAll();
    }

    public function lockSeat(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'seat_id' => 'required|exists:seats,id',
        ])->validate();

        $seat = $this->seatRepository->find($validated['seat_id']);
        $sessionId = $request->session()->getId();

        if ($this->seatRepository->isLockedByAnother($seat, $sessionId)) {
            return response()->json(['message' => 'Seat is locked by another user'], 409);
        }

        $this->seatRepository->lockSeat($seat, $sessionId);

        return response()->json(['message' => 'Seat locked']);
    }

    public function getLockedSeats()
    {
        return $this->seatRepository->getLockedSeats();
    }
}
