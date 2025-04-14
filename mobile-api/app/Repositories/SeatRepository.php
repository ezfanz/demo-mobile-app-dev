<?php

namespace App\Repositories;

use App\Models\Seat;
use Carbon\Carbon;

class SeatRepository
{
    public function getAll()
    {
        return Seat::all();
    }

    public function find($id): ?Seat
    {
        return is_array($id) ? null : Seat::find($id);
    }

    public function lockSeat(Seat $seat, string $sessionId): Seat
    {
        $seat->update([
            'locked_by' => $sessionId,
            'locked_at' => now(),
        ]);

        return $seat;
    }

    public function isLockedByAnother(Seat $seat, string $sessionId): bool
    {
        return $seat->locked_by &&
               $seat->locked_by !== $sessionId &&
               $seat->locked_at > Carbon::now()->subMinutes(5);
    }

    public function getLockedSeats()
    {
        return Seat::whereNotNull('locked_at')
                   ->where('locked_at', '>', Carbon::now()->subMinutes(5))
                   ->pluck('id');
    }
}
