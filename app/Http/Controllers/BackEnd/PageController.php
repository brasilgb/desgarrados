<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Meta;
use App\Models\Post;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->get('q');

        $query = Post::where('type', 0)->orderBy('id', 'desc');

        if ($search) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        $pages = $query->paginate(10);

        return Inertia::render('BackEnd/Pages/index', ['pages' => $pages]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('BackEnd/Pages/addPage');
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
                'featured' => ['required']
            ],
            $messages,
            [
                'title' => 'título',
                'summary' => 'resumo',
                'content' => 'conteúdo',
                'featured' => 'imagem destacada'
            ]
        );

        if ($request->hasfile('featured')) {
            $fileName = time() . '.' . $request->featured->extension();
            $request->featured->move(public_path('storage/uploads'), $fileName);
        }

        $data['slug'] = Str::slug($request->title);
        $data['featured'] = $request->hasfile('featured') ? $fileName : Null;
        Post::create($data);
        Session::flash('success', 'Página criada com sucesso!');
        return redirect()->route('pages.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Post $page)
    {
        return Inertia::render('BackEnd/Pages/editPage', ['page' => $page]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $page
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $page)
    {
        return Redirect::route('pages.show', ['page' => $page->id]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $page)
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
        if ($request->hasfile('featured')) {
            $storePath = public_path('storage/uploads');
            $fileName = time() . '.' . $request->featured->extension();
            if (file_exists($storePath . DIRECTORY_SEPARATOR . $request->featured)) {
                unlink($storePath . DIRECTORY_SEPARATOR . $request->featured);
            }
            $request->featured->move($storePath, $fileName);
        }

        $data['slug'] = Str::slug($request->title);
        $data['featured'] = $request->hasfile('featured') ? $fileName : $page->featured;

        $page->update($data);
        Session::flash('success', 'Página editada com sucesso!');
        return Redirect::route('pages.show', ['page' => $page->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $page)
    {
        $storePath = public_path('storage/uploads');
        if (file_exists($storePath . DIRECTORY_SEPARATOR . $page->featured)) {
            unlink($storePath . DIRECTORY_SEPARATOR . $page->featured);
        }
        $page->delete($page);
        Session::flash('success', 'Página deletada com sucesso!');
        return Redirect::route('pages.index');
    }
}