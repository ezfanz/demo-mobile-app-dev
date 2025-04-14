<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvPath = database_path('seeders/csv/users.csv');

        $data = array_map('str_getcsv', file($csvPath));
        $header = array_shift($data);

        foreach ($data as $row) {
            DB::table('users')->insert(array_combine($header, $row));
        }
    }
}
