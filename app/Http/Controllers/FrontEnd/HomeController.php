<?php

namespace App\Http\Controllers\FrontEnd;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Meta;
use App\Models\Category;
use App\Models\Section;
use App\Models\Settings;

class HomeController extends Controller
{
    public function index()
    {
        $sections = Section::first();
        $categories = Category::with('posts')->get();

        return Inertia::render('FrontEnd/Home/index', ['sections' => $sections, 'categories' => $categories]);
    }
}
