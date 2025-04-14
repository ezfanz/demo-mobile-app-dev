<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Seat;
use Carbon\Carbon;

class ExpireLockedSeats extends Command
{
    protected $signature = 'seats:expire-locks';
    protected $description = 'Expire seat locks older than 5 minutes';

    public function handle()
    {
        $expired = Seat::whereNotNull('locked_at')
            ->where('locked_at', '<=', now()->subMinutes(5))
            ->update([
                'locked_at' => null,
                'locked_by' => null
            ]);

        $this->info("Expired $expired locked seat(s).");
    }
}

