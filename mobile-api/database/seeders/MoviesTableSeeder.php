<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MoviesTableSeeder extends Seeder
{
    public function run(): void
    {
        $csvPath = database_path('seeders/csv/movies.csv');
        $data = array_map('str_getcsv', file($csvPath));
        $header = array_shift($data);

        foreach ($data as $row) {
            $movieData = array_combine($header, $row);

            // 🛠 Format the release_date if it exists
            if (!empty($movieData['release_date'])) {
                try {
                    $movieData['release_date'] = Carbon::parse($movieData['release_date'])->format('Y-m-d');
                } catch (\Exception $e) {
                    $movieData['release_date'] = null; // or handle/log error
                }
            }

            DB::table('movies')->insert($movieData);
        }
    }
}
