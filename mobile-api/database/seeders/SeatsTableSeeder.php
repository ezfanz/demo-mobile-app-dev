<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvPath = database_path('seeders/csv/seats.csv');

        $data = array_map('str_getcsv', file($csvPath));
        $header = array_shift($data);

        foreach ($data as $row) {
            $mappedRow = array_combine($header, $row);

            // Convert empty strings to null for datetime + optional values
            $mappedRow['locked_at'] = empty($mappedRow['locked_at']) ? null : $mappedRow['locked_at'];
            $mappedRow['locked_by'] = empty($mappedRow['locked_by']) ? null : $mappedRow['locked_by'];

            DB::table('seats')->insert($mappedRow);
        }
    }
}
