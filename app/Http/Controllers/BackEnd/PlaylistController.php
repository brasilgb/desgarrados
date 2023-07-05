<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');

        $query = Playlist::with('audios')->orderBy('id', 'desc');

        if ($search) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        $playlists = $query->paginate(10);
        return Inertia::render('BackEnd/Playlists/index', ['playlists' => $playlists]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $playlists = Playlist::with('audios')->get();
        return Inertia::render('BackEnd/Playlists/addPlaylist', ['playlists' => $playlists]);
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
                'gender' => ['required'],
                'description' => ['required']
            ],
            $messages,
            [
                'title' => 'título',
                'gender' => 'genero',
                'description' => 'descrição'
            ]
        );
        if ($request->hasfile('cover')) {
            $fileName = time() . '.' . $request->cover->extension();
            $storePath = public_path('storage/playlists');
            if (!file_exists($storePath)) {
                mkdir($storePath, 0755, true);
            };
            $request->cover->move($storePath, $fileName);
        }

        $data['cover'] = $request->hasfile('cover') ? $fileName : Null;
        $data['slug'] = Str::slug($request->title);
        Playlist::create($data);
        Session::flash('success', 'Playlist criada com sucesso!');
        return Redirect::route('playlists.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Playlist  $playlist
     * @return \Illuminate\Http\Response
     */
    public function show(Playlist $playlist)
    {
        $playlists = Playlist::orderByDesc('title')->get();
        return Inertia::render('BackEnd/Playlists/editPlaylist', ['playlist' => $playlist, 'playlists' => $playlists]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Playlist  $playlist
     * @return \Illuminate\Http\Response
     */
    public function edit(Playlist $playlist)
    {
        return redirect()->route('playlists.show', ['playlist' => $playlist->id]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Playlist  $playlist
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Playlist $playlist)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'title' => ['required'],
                'gender' => ['required'],
                'description' => ['required']
            ],
            $messages,
            [
                'title' => 'título',
                'gender' => 'gênero',
                'description' => 'descrição'
            ]
        );
        if ($request->hasfile('cover')) {
            $storePath = public_path('storage/playlists');
            $fileName = time() . '.' . $request->cover->extension();
            if (file_exists($storePath . DIRECTORY_SEPARATOR . $request->cover)) {
                unlink($storePath . DIRECTORY_SEPARATOR . $request->cover);
            }
            if (!file_exists($storePath)) {
                mkdir($storePath, 0755, true);
            };
            $request->cover->move($storePath, $fileName);
        }

        $data['cover'] = $request->hasfile('cover') ? $fileName : $playlist->cover;
        $data['slug'] = Str::slug($request->title);
        $playlist->update($data);
        Session::flash('success', 'Playlist editada com sucesso!');
        return redirect()->route('playlists.show', ['playlist' => $playlist->id]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Playlist  $playlist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Playlist $playlist)
    {
        $storePath = public_path('storage/playlists');
        if (file_exists($storePath . DIRECTORY_SEPARATOR . $playlist->cover)) {
            unlink($storePath . DIRECTORY_SEPARATOR . $playlist->cover);
        }
        $playlist->audios()->detach();
        $playlist->delete($playlist);
        Session::flash('success', 'Playlist deletada com sucesso!');
        return redirect()->route('playlists.index');
    }
}
