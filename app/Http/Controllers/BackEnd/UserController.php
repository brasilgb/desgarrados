<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Models\Settings;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $settings = Settings::first();

        // if (Auth::user()->role === 1) {
        //     $query = User::where('id', Auth::user()->id);
        // } else {
        $search = $request->get('q');

        $query = User::orderBy('id', 'desc');

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }
        // }
        $users = $query->paginate(10);

        return Inertia::render('BackEnd/Users/index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        // if(Auth::user()->role === 1 ) {
        //     return Redirect::route('users.index');
        // }else{
        return Inertia::render('BackEnd/Users/addUser');
        // }

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
            'required' => 'O campo :attribute deve ser preenchido!',
            'confirmed' => 'Redigite a senha, devem ser iguais.',
            'same' => 'Redigite a senha, devem ser iguais.',
            'email' => 'O campo :attribute deve ser um endereço de email válido!',
            'unique' => 'O :attribute já está cadastrado!',
        ];
        $request->validate(
            [
                'name' => 'required',
                'username' => 'required',
                'email' => 'required|email|unique:users',
                'password'              => 'required',
                'password_confirmation' => 'required|same:password',
                'role' => 'required'
            ],
            $messages,
            [
                'name' => 'nome',
                'username' => 'nome de usuário',
                'email' => 'e-mail',
                'password_confirmation' => 'repita a senha',
                'role' => 'função',
            ]
        );

        if ($request->hasfile('avatar')) {
            $fileName = time() . '.' . $request->avatar->extension();
            $request->avatar->move(public_path('storage/uploads'), $fileName);
        }
        $data['password'] = Hash::make($request->password);
        $data['avatar'] = $request->hasfile('avatar') ? $fileName : Null;
        User::create($data);
        Session::flash('success', 'Usuário criado com sucesso!');
        return redirect()->route('users.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return Inertia::render('BackEnd/Users/editUser', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return Redirect::route('users.show', ['user' => $user->id]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!',
            'confirmed' => 'Redigite a senha, devem ser iguais.',
            'email' => 'O campo :attribute deve ser um endereço de email válido!',
            'unique' => 'O :attribute já está cadastrado!',
        ];
        $request->validate(
            [
                'name' => 'required',
                'username' => 'required',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'password'              => '',
                'password_confirmation' => 'same:password',
                'role' => 'required'

            ],
            $messages,
            [
                'name' => 'nome',
                'username' => 'nome de usuário',
                'email' => 'e-mail',
                'role' => 'função'
            ]
        );
        if ($request->hasfile('avatar')) {
            $fileName = time() . '.' . $request->avatar->extension();
            $request->avatar->move(public_path('storage/uploads'), $fileName);
            if ($user->avatar && file_exists(public_path('storage/uploads') . DIRECTORY_SEPARATOR . $user->avatar)) {
                unlink(public_path('storage/uploads') . DIRECTORY_SEPARATOR . $user->avatar);
            }
        }
        $data['password'] = $request->password ? Hash::make($request->password) : $user->password;
        $data['avatar'] = $request->hasfile('avatar') ? $fileName : $user->avatar;
        $user->update($data);
        Session::flash('success', 'Usuário editado com sucesso!');
        return redirect()->route('users.show', ['user' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {

        if ($user->avatar && file_exists(public_path('uploads') . DIRECTORY_SEPARATOR . $user->avatar)) {
            unlink(public_path('uploads') . DIRECTORY_SEPARATOR . $user->avatar);
        }
        $user->delete($user);
        Session::flash('success', 'Usuário deletado com sucesso!');
        return Redirect::route('users.index');
    }
}
