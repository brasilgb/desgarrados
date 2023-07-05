<?php

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    
    public function index(Request $request) {

        $post = Post::with('categories')->where('slug', $request->post)->first();
        return Inertia::render('Site/Posts/index', ['post' => $post]);
    }
}
