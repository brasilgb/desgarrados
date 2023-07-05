<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');

        $query = Comment::orderBy('id', 'desc');

        if ($search) {
            $query->where('comment', 'like', '%' . $search . '%');
        }

        $comments = $query->paginate(10);

        return Inertia::render('BackEnd/Comments/index', ['comments' => $comments]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('BackEnd/Comments/addComment');
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
                'author' => ['required'],
                'email' => ['required'],
                'content' => ['required'],
            ],
            $messages,
            [
                'author' => 'autor',
                'email' => 'e-mail',
                'content' => 'conteúdo'
            ]
        );

        Comment::create($data);
        Session::flash('success', 'Comentário criado com sucesso!');
        return Redirect::route('comments.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        return Inertia::render('BackEnd/Comments/editComment', ['comment' => $comment]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        return Redirect::route('comments.show', ['comment' => $comment->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {

        $data = $request->all();
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido!'
        ];
        $request->validate(
            [
                'author' => ['required'],
                'email' => ['required'],
                'content' => ['required'],
            ],
            $messages,
            [
                'author' => 'autor',
                'email' => 'e-mail',
                'content' => 'conteúdo'
            ]
        );

        $comment->update($data);
        Session::flash('success', 'Comentário editado com sucesso!');
        return Redirect::route('comments.show', ['comment' => $comment->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete($comment);
        Session::flash('success', 'Comentário deletado com sucesso!');
        return Redirect::route('comments.index');
    }
}
