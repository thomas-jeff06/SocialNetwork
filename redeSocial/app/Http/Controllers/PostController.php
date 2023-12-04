<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Psy\Readline\Hoa\Console;

class PostController extends Controller
{
    public function index()
    {
        return Post::all();
    }

    public function create()
    {

    }

    public function store(Request $request)
    {
        try {

            $request->validate([
                'author' => 'required|string|max:255',
                'type' => 'required|in:Post,Article,Group',
                'text' => 'required|string',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048|nullable',
            ]);

            $post = new Post();
            $post->author = $request->input('author');
            $post->type = $request->input('type');
            $post->text = $request->input('text');

            // Upload da imagem (se fornecida)
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images');
                $post->image = $imagePath;
            } else {
                $post->image = null;
            }

            $post->save();

            return response()->json(['message' => 'Post criado com sucesso', 'post' => $post], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro durante a criação do post'], 500);
        }
    }

    public function show(string $id)
    {
        return Post::findOrfail($id);
    }

    public function update(Request $request, string $id)
    {
        try {
            $request->validate([
                'author' => 'required|string|max:255',
                'type' => 'required|in:Post,Article,Group',
                'text' => 'required|string',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048|nullable',
            ]);

            $post = Post::findOrfail($id);

            if (!$post) {
                return response()->json(['message' => 'Post não encontrado'], 404);
            }
            $post->author = $request->input('author');
            $post->type = $request->input('type');
            $post->text = $request->input('text');

            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images');
                $post->image = $imagePath;
            }
            $post->update();

            return response()->json(['message' => 'Post atualizado com sucesso', 'post' => $post]);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro durante a criação do post'], 500);
        }
    }

    public function destroy(string $id)
    {
        $post = Post::findOrfail($id);

        if (!$post) {
            return response()->json(['message' => 'Post não encontrado'], 404);
        }

        $post->delete();

        return response()->json(['message' => 'Post excluído com sucesso']);
    }
}
