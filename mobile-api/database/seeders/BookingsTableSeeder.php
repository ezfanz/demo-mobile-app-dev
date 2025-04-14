<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BookingsTableSeeder extends Seeder
{
    public function run(): void
    {
        $csvPath = database_path('seeders/csv/bookings.csv');
        $data = array_map('str_getcsv', file($csvPath));
        $header = array_shift($data);

        foreach ($data as $row) {
            $booking = array_combine($header, $row);

            // Format datetime fields
            $booking['booking_time'] = Carbon::parse($booking['booking_time']);
            $booking['created_at'] = Carbon::parse($booking['created_at']);
            $booking['updated_at'] = Carbon::parse($booking['updated_at']);

            DB::table('bookings')->insert($booking);
        }
    }
}
