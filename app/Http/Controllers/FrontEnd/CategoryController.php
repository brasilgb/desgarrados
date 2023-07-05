<?php

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request) {

        $category = Category::with('posts')->where('slug', $request->category)->first();

        return Inertia::render('Site/Categories/index', [ 'category' => $category]);
    }
}
