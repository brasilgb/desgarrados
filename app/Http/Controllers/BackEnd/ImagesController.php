<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');

        $query = Gallery::with('images')->orderBy('id', 'desc');

        if ($search) {
            $query->where('title', 'like', '%' . $search . '%');
        }

        $galleries = $query->paginate(10);
        return Inertia::render('BackEnd/Images/index', ['galleries' => $galleries]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $galleries = Gallery::get();
        return Inertia::render('BackEnd/Images/addImage', ['galleries' => $galleries]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'image' => 'required',
                'image.*' => 'required|mimes:png,jpg|max:5000',
            ],
            $messages,
            [
                'imagem' => 'imagem'
            ]
        );
        $storePath = public_path('storage/galleries');
        if (!file_exists($storePath)) {
            mkdir($storePath, 0755, true);
        };

        if ($request->image) {
            foreach ($request->image as $file) {
                $originalname = $file->getClientOriginalName();
                $filename = time() . rand(1, 50) . '.' . $file->extension();
                $file->move($storePath, $filename);

                Image::create([
                    'title' => pathinfo($originalname, PATHINFO_FILENAME),
                    'image' => $filename
                ]);
                $image = Image::orderByDesc('id')->first();
                $image->galleries()->attach($request->gallery_id);
            }
        }

        Session::flash('success', 'Página criada com sucesso!');
        return redirect()->route('images.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Image $image)
    {

        $data = [
            'title' => $request->title ? $request->title : $image->title,
            'description' => $request->description ? $request->description : $image->description
        ];

        $image->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        // dd($image);
        $storePath = public_path('storage/galleries');
        if (file_exists($storePath . DIRECTORY_SEPARATOR . $image->image)) {
            unlink($storePath . DIRECTORY_SEPARATOR . $image->image);
        }
        $image->galleries()->detach();
        $image->delete($image);
        Session::flash('success', 'Imagem deletada com sucesso!');
        return redirect()->route('images.index');
    }
}
