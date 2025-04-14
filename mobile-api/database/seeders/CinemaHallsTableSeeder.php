<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CinemaHallsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvPath = database_path('seeders/csv/cinema_halls.csv');

        $data = array_map('str_getcsv', file($csvPath));
        $header = array_shift($data);

        foreach ($data as $row) {
            DB::table('cinema_halls')->insert(array_combine($header, $row));
        }
    }
}
