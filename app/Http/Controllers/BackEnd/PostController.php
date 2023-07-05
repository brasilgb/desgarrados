<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Meta;
use App\Models\Category;
use App\Models\Post;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->get('q');

        $query = Post::with('categories')->where('type', 1)->orderBy('id', 'desc');

        if ($search) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        $posts = $query->paginate(10);

        return Inertia::render('BackEnd/Posts/index', ['posts' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::get();
        return Inertia::render('BackEnd/Posts/addPost', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'title' => ['required'],
                'summary' => ['required'],
                'content' => ['required'],
                'category_id' => ['required'],
                'featured' => ['required']
            ],
            $messages,
            [
                'title' => 'título',
                'summary' => 'resumo',
                'content' => 'conteúdo',
                'category_id' => 'categoria',
                'featured' => 'imagem destacada'
            ]
        );

        $storePath = public_path('storage/uploads');
        if ($request->hasfile('featured')) {
            $fileName = time() . '.' . $request->featured->extension();
            if (!file_exists($storePath)) {
                mkdir($storePath, 0755, true);
            };
            $request->featured->move($storePath, $fileName);
        }

        $data['slug'] = Str::slug($request->title);
        $data['featured'] = $request->hasfile('featured') ? $fileName : Null;
        Post::create($data);

        $post = Post::orderByDesc('id')->first();
        $post->categories()->attach($request->category_id);

        Session::flash('success', 'Postagem criada com sucesso!');
        return redirect()->route('posts.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {

        $categories = Category::get();

        return Inertia::render('BackEnd/Posts/editPost', ['categories' => $categories, 'postage' => $post, 'postCategory' => $post->categories]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {

        return Redirect::route('posts.show', ['post' => $post->id]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'title' => ['required'],
                'summary' => ['required'],
                'content' => ['required'],
            ],
            $messages,
            [
                'title' => 'título',
                'summary' => 'resumo',
                'content' => 'conteúdo',
            ]
        );

        $storePath = public_path('storage/uploads');
        if ($request->hasfile('featured')) {
            $fileName = time() . '.' . $request->featured->extension();
            $request->featured->move($storePath, $fileName);
            if (file_exists($storePath . DIRECTORY_SEPARATOR . $request->featured)) {
                unlink($storePath . DIRECTORY_SEPARATOR . $request->featured);
            }
        }

        $data['slug'] = Str::slug($request->title);
        $data['featured'] = $request->hasfile('featured') ? $fileName : $post->featured;
        $post->update($data);

        if ($request->category_id != null) {
            
            $posta = Post::find($post->id);
            $posta->categories()->sync($request->category_id);
        }

        Session::flash('success', 'Postagem editada com sucesso!');
        return Redirect::route('posts.show', ['post' => $post->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $storePath = public_path('storage/uploads');
        if (file_exists($storePath . DIRECTORY_SEPARATOR . $post->featured)) {
            unlink($storePath . DIRECTORY_SEPARATOR . $post->featured);
        }
        $post->categories()->detach();
        $post->delete($post);

        Session::flash('success', 'Postagem deletada com sucesso!');
        return Redirect::route('posts.index');
    }
}
