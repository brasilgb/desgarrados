<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Models\Audio;
use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
class AudioController extends Controller
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
        return Inertia::render('BackEnd/Audios/index', ['playlists' => $playlists]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $playlists = Playlist::get();
        return Inertia::render('BackEnd/Audios/addAudio', ['playlists' => $playlists]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->audio);
        $messages = [
            'required' => 'A :attribute deve ser selecionada(o)!',
            'mimes' => 'O áudio :attribute deve ser do tipo mp3!',
            'max' => 'O áudio :attribute deve ter o max:5M!',
        ];
        $request->validate(
            [
                'playlist_id' => ['required'],
                'audio' => 'required',
                'audio.*' => 'required',
            ],
            $messages,
            [
                'playlist_id' => 'playlist',
                'audio' => 'audio',
                'audio.*' => 'audios'
            ]
        );
        
        $storePath = public_path('storage/playlists');
        if (!file_exists($storePath)) {
            mkdir($storePath, 0755, true);
        };

        $validator = Validator::make($request->all(), [
            'audio.*' => 'required|max:200000',
        ]);

        if ($validator->fails()) {
            Session::flash('success', 'Áudio não carregado, verifique se o formato é mp3 e com no max:10M!');
            return redirect()->route('audios.create');
        } else {
            if ($request->audio) {

                foreach ($request->audio as $file) {
                    $originalname = $file->getClientOriginalName();
                    $filename = time() . rand(1, 50) . '.' . $file->getClientOriginalExtension();
                    $file->move($storePath, $filename);
                    Audio::create([
                        'title' => pathinfo($originalname, PATHINFO_FILENAME),
                        'audio' => $filename
                    ]);
                    $audio = Audio::orderByDesc('id')->first();
                    $audio->playlists()->attach($request->playlist_id);
                }
            }
        }
        Session::flash('success', 'Áudio carregadoriada com sucesso!');
        return redirect()->route('audios.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Audio $audio)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Audio $audio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Audio $audio)
    {
        $data = [
            'title' => $request->title ? $request->title : $audio->title
        ];

        $audio->update($data);
        return redirect()->route('audios.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Audio $audio)
    {
        $storePath = public_path('storage/playlists');
        if (file_exists($storePath . DIRECTORY_SEPARATOR . $audio->audio)) {
            unlink($storePath . DIRECTORY_SEPARATOR . $audio->audio);
        }
        $audio->playlists()->detach();
        $audio->delete($audio);
        Session::flash('success', 'Audiom deletada com sucesso!');
        return redirect()->route('audios.index');
    }
}
