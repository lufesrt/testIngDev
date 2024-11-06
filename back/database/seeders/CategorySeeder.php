<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'title' => 'Technology',
                'content' => 'Technology',
                'created_at' => now()
            ],
            [
                'title' => 'Health',
                'content' => 'Health',
                'created_at' => now()
            ],
            [
                'title' => 'Lifestyle',
                'content' => 'Lifestyle',
                'created_at' => now()
            ],
            [
                'title' => 'Education',
                'content' => 'Education',
                'created_at' => now()
            ],
        ]);
    }
}
