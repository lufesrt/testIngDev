<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Crear un nuevo post.
     */
    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:categories,id',
            'tags' => 'nullable|string',
            'status' => 'required|in:published,draft,archived',
            'featured_image' => 'nullable|url',
            'published_at' => 'nullable|date',
        ]);

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => Auth::id(),
            'category_id' => $request->category_id,
            'tags' => $request->tags,
            'status' => $request->status,
            'featured_image' => $request->featured_image,
            'published_at' => $request->published_at,
        ]);

        return response()->json(['message' => 'Post creado exitosamente', 'post' => $post], 201);
    }

    /**
     * Listar todos los posts.
     */
    public function index()
    {
        $posts = Post::with('user', 'category')->get();

        return response()->json(['posts' => $posts], 200);
    }

    /**
     * Ver un post específico.
     */
    public function show($id)
    {
        $post = Post::with('user', 'category')->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post no encontrado'], 404);
        }

        return response()->json(['post' => $post], 200);
    }

    /**
     * Listar todos los posts de una categoría específica.
     */
    public function postsByCategory($categoryid)
    {
        $posts = Post::where('category_id', $categoryid)->with('user', 'category')->get();

        if ($posts->isEmpty()) {
            return response()->json(['message' => 'No se encontraron posts para esta categoría'], 404);
        }

        return response()->json(['posts' => $posts], 200);
    }
}
