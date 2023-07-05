<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        $search = $request->get('q');

        $query = Gallery::with('images')->orderBy('id', 'desc');

        if ($search) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        $galleries = $query->paginate(10);

        return Inertia::render('BackEnd/Galleries/index', ['galleries' => $galleries]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $galleries = Gallery::with('images')->get();
        return Inertia::render('BackEnd/Galleries/addGallery', ['galleries' => $galleries]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $data = $request->all();
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'title' => ['required'],
                'description' => ['required']
            ],
            $messages,
            [
                'title' => 'gallery',
                'description' => 'descrição'
            ]
        );
        if ($request->hasfile('cover')) {
            $fileName = time() . '.' . $request->cover->extension();
            $storePath = public_path('storage/galleries');
            if (!file_exists($storePath)) {
                mkdir($storePath, 0755, true);
            };
            $request->cover->move($storePath, $fileName);
        }

        $data['cover'] = $request->hasfile('cover') ? $fileName : Null;
        $data['slug'] = Str::slug($request->title);
        Gallery::create($data);
        Session::flash('success', 'Galeria criada com sucesso!');
        return Redirect::route('galleries.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Gallery  $gallery
     * @return \Illuminate\Http\Response
     */
    public function show(Gallery $gallery)
    {
        $galleries = Gallery::orderByDesc('title')->get();
        return Inertia::render('BackEnd/Galleries/editGallery', ['gallery' => $gallery, 'galleries' => $galleries]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Gallery  $gallery
     * @return \Illuminate\Http\Response
     */
    public function edit(Gallery $gallery)
    {
        return redirect()->route('galleries.show', ['gallery' => $gallery->id]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Gallery  $gallery
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Gallery $gallery)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'title' => ['required']
            ],
            $messages,
            [
                'title' => 'título'
            ]
        );
        if ($request->hasfile('cover')) {
            $storePath = public_path('storage/galleries');
            $fileName = time() . '.' . $request->cover->extension();
            if (file_exists($storePath . DIRECTORY_SEPARATOR . $request->cover)) {
                unlink($storePath . DIRECTORY_SEPARATOR . $request->cover);
            }
            if (!file_exists($storePath)) {
                mkdir($storePath, 0755, true);
            };
            $request->cover->move($storePath, $fileName);
        }

        $data['cover'] = $request->hasfile('cover') ? $fileName : $gallery->cover;
        $data['slug'] = Str::slug($request->title);
        $gallery->update($data);
        Session::flash('success', 'Galeria editada com sucesso!');
        return redirect()->route('galleries.show', ['gallery' => $gallery->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Gallery  $gallery
     * @return \Illuminate\Http\Response
     */
    public function destroy(Gallery $gallery)
    {
        $storePath = public_path('storage/galleries');
        if (file_exists($storePath . DIRECTORY_SEPARATOR . $gallery->cover)) {
            unlink($storePath . DIRECTORY_SEPARATOR . $gallery->cover);
        }
        $gallery->images()->detach();
        $gallery->delete($gallery);
        Session::flash('success', 'Galeria deletada com sucesso!');
        return redirect()->route('galleries.index');
    }
}
