<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_creates_a_post_successfully()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        // Crear una categoría de prueba
        $category = Category::create(['title' => 'Technology', 'content' => 'Technology']);

        // Crear el post usando el `category_id` válido
        $response = $this->postJson('/api/posts', [
            'title' => 'Mi Primer Post',
            'content' => 'Este es el contenido de mi primer post.',
            'category_id' => $category->id, // Usar el ID de la categoría creada
            'tags' => 'laravel,php,backend',
            'status' => 'published',
            'featured_image' => 'http://example.com/image.jpg',
            'published_at' => '2024-11-05T10:00:00'
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'message',
            'post' => [
                'id',
                'title',
                'content',
                'category_id',
                'user_id',
                'tags',
                'status',
                'featured_image',
                'published_at',
                'created_at',
                'updated_at',
            ]
        ]);

        $this->assertDatabaseHas('posts', [
            'title' => 'Mi Primer Post',
            'user_id' => $user->id
        ]);
    }

    /** @test */
    public function it_fails_to_create_post_with_invalid_data()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/posts', [
            'title' => '',
            'content' => '',
            'status' => 'invalid_status'
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['title', 'content', 'status']);
    }
}
