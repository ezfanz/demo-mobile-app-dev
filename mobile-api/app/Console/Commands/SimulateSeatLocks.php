<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Seat;
use Illuminate\Support\Carbon;

class SimulateSeatLocks extends Command
{
    protected $signature = 'seats:simulate-locks';
    protected $description = 'Randomly lock 1 seat every minute for demo (max 10 seats)';

    public function handle()
    {
      
        $lockedCount = Seat::whereNotNull('locked_at')
            ->where('locked_at', '>', now()->subMinutes(5))
            ->count();

        if ($lockedCount >= 10) {
            $this->info('Maximum of 10 locked seats reached. Skipping.');
            return;
        }

     
        $seat = Seat::whereNull('locked_by')
            ->orWhere('locked_at', '<=', now()->subMinutes(5))
            ->inRandomOrder()
            ->first();

        if (!$seat) {
            $this->warn('No available seat to lock.');
            return;
        }

        $seat->update([
            'locked_by' => 'demo-scheduler',
            'locked_at' => Carbon::now(),
            'status' => 'unavailable',
        ]);

        $this->info("Locked seat #{$seat->id}");
    }
}
