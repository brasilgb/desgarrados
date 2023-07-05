<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $search = $request->get('q');
        $query = Schedule::orderBy('id', 'desc');

        if ($search) {
            $query->whereDate('start', 'like', '%' . $search . '%');
        }

        $schedules = $query->paginate(10);

        return Inertia::render('BackEnd/Schedules/index', ['schedules' => $schedules]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('BackEnd/Schedules/addSchedule');
    }

    /**
     * Store a newly created resource in storage.
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
                'title'     => ['required'],
                'state'     => ['required'],
                'city'      => ['required'],
                'locale'    => ['required'],
                'start'    => ['required'],
                'end'      => ['required'],
                'description' => ['required'],
                'cover'     => ['required'],
            ],
            $messages,
            [
                'title'     => 'título',
                'state'     => 'estado',
                'city'      => 'cidade',
                'locale'    => 'local',
                'start'    => 'data início',
                'end'      => 'data término',
                'description' => 'descrição',
                'cover'     => 'banner',
            ]
        );
        $storePath = public_path('storage/agenda');
        if ($request->hasfile('cover')) {
            $fileName = time() . '.' . $request->cover->extension();
            if (!file_exists($storePath)) {
                mkdir($storePath, 0755, true);
            };
            $request->cover->move($storePath, $fileName);
        }

        $data['slug'] = Str::slug($request->title);
        $data['cover'] = $request->hasfile('cover') ? $fileName : Null;
        Schedule::create($data);
        Session::flash('success', 'Agenda criada com sucesso!');
        return redirect()->route('schedules.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Schedule $schedule)
    {
        return Inertia::render('BackEnd/Schedules/editSchedule', ['schedule' => $schedule]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Schedule $schedule)
    {
        return Redirect::route('schedules.show', ['schedule' => $schedule->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Schedule $schedule)
    {
        // dd($request->all());
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'title'     => ['required'],
                'state'     => ['required'],
                'city'      => ['required'],
                'locale'    => ['required'],
                'start'    => ['required'],
                'end'      => ['required'],
                'description' => ['required'],
                'cover'     => ['required'],
            ],
            $messages,
            [
                'title'     => 'título',
                'state'     => 'estado',
                'city'      => 'cidade',
                'locale'    => 'local',
                'start'    => 'data início',
                'end'      => 'data término',
                'description' => 'descrição',
                'cover'     => 'banner',
            ]
        );
        $storePath = public_path('storage/agenda');
        if ($request->hasfile('cover')) {
            $fileName = time() . '.' . $request->cover->extension();
            if (file_exists($storePath . DIRECTORY_SEPARATOR . $request->cover)) {
                unlink($storePath . DIRECTORY_SEPARATOR . $request->cover);
            }
            $request->cover->move($storePath, $fileName);
        }

        $data['slug'] = Str::slug($request->title);
        $data['cover'] = $request->hasfile('cover') ? $fileName : $schedule->cover;
        $schedule->update($data);
        Session::flash('success', 'Agenda editada com sucesso!');
        return redirect()->route('schedules.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Schedule $schedule)
    {
        $storePath = public_path('storage/agenda');
        if (file_exists($storePath . DIRECTORY_SEPARATOR . $schedule->cover)) {
            unlink($storePath . DIRECTORY_SEPARATOR . $schedule->cover);
        }
        $schedule->delete($schedule);
        Session::flash('success', 'Agenda deletada com sucesso!');
        return Redirect::route('schedules.index');
    }
}
