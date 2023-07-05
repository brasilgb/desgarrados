<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Meta;
use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Settings $settings, Request $request)
    {        
        $settings = Settings::first();
        
        if (Settings::get()->isEmpty()) {
            Settings::create(['title' => '']);
        }
        $settings = Settings::first();
        return Inertia::render('BackEnd/Settings/index', ['setting' => $settings]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Settings  $settings
     * @return \Illuminate\Http\Response
     */
    public function show(Settings $settings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Settings  $settings
     * @return \Illuminate\Http\Response
     */
    public function edit(Settings $settings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Settings  $settings
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Settings $settings)
    {
        
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
        if ($request->hasfile('logo')) {
            $fileName = time() . '.' . $request->logo->extension();
            $request->logo->move(public_path('storage/logo'), $fileName);
            if ($settings->first()->logo != null && file_exists(public_path('storage/logo') . DIRECTORY_SEPARATOR . $settings->first()->logo)) {
                
                unlink(public_path('storage/logo') . DIRECTORY_SEPARATOR . $settings->first()->logo);
            }
        } 

        $settings->where('id', $settings->first()->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'metadescription' => $request->metadescription,
            'logo' => $request->hasfile('logo') ? $fileName : $settings->first()->logo,
            'address' => $request->address,
            'maps' => $request->maps,
            'contacts' => $request->contacts
        ]);
        Session::flash('success', 'Configuracões editadas com sucesso!');
        return Redirect::route('settings.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Settings  $settings
     * @return \Illuminate\Http\Response
     */
    public function destroy(Settings $settings)
    {
        //
    }
}
