<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('posts')->insert([
            [
                'title' => 'Mi Primer Post',
                'content' => 'Este es el contenido de mi primer post.',
                'category_id' => 1, // ID de la categoría Technology creada en CategorySeeder
                'user_id' => 1, // Asegúrate de tener un usuario con ID 1
                'tags' => 'laravel,php,backend',
                'status' => 'published',
                'featured_image' => 'http://example.com/image.jpg',
                'published_at' => Carbon::parse('2024-11-05T10:00:00'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Puedes agregar más posts aquí si lo deseas
        ]);
    }
}
