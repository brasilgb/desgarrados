<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');

        $query = Message::orderBy('id', 'desc');

        if ($search) {
            $query->where('message', 'like', '%' . $search . '%');
        }

        $messages = $query->paginate(10);

        return Inertia::render('BackEnd/Messages/index', ['messageuser' => $messages]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('BackEnd/Messages/addMessage');
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
                'name'    => ['required'],
                'state'   => ['required'],
                'city'    => ['required'],
                'message' => ['required']
            ],
            $messages,
            [
                'name' => 'nome',
                'state' => 'estado',
                'city' => 'cidade',
                'message' => 'mensagem'
            ]
        );

        Message::create($data);
        Session::flash('success', 'Mensagem criada com sucesso!');
        return Redirect::route('messages.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        return Inertia::render('BackEnd/Messages/editMessage', ['message' => $message]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        return Redirect::route('messages.show', ['message' => $message->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {

        $data = $request->all();
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'name'    => ['required'],
                'state'   => ['required'],
                'city'    => ['required'],
                'message' => ['required']
            ],
            $messages, 
            [
                'name' => 'nome',
                'state' => 'estado',
                'city' => 'cidade',
                'message' => 'mensagem'
            ]
        );

        $message->update($data);
        Session::flash('success', 'Mensagem editada com sucesso!');
        return Redirect::route('messages.show', ['message' => $message->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $message->delete($message);
        Session::flash('success', 'Mensagem deletada com sucesso!');
        return Redirect::route('messages.index');
    }
}
