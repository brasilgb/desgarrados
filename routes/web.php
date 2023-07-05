<?php

use App\Http\Controllers\BackEnd\AudioController;
use App\Http\Controllers\BackEnd\GalleryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// Rotas Admin
use App\Http\Controllers\BackEnd\HomeController as BackEndHome;
use App\Http\Controllers\BackEnd\CategoryController;
use App\Http\Controllers\BackEnd\CommentsController;
use App\Http\Controllers\BackEnd\ImagesController;
use App\Http\Controllers\BackEnd\MessageController;
use App\Http\Controllers\BackEnd\SectionController;
use App\Http\Controllers\BackEnd\PageController;
use App\Http\Controllers\BackEnd\PlaylistController;
use App\Http\Controllers\BackEnd\PostController;
use App\Http\Controllers\BackEnd\ScheduleController;
use App\Http\Controllers\BackEnd\SettingsController;
use App\Http\Controllers\BackEnd\UserController;

use App\Http\Controllers\FrontEnd\HomeController as FrontEndHome;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
*/

// Site routes
Route::get('/', [FrontEndHome::class, 'index'])->name('/');

// Admin routes
Route::group(['prefix' => 'admin'], function () {
    Route::get('/', [BackEndHome::class, 'index'])->name('admin');
    Route::resource('/categories', CategoryController::class);
    Route::resource('/galleries', GalleryController::class);
    Route::resource('/playlists', PlaylistController::class);
    Route::resource('/posts', PostController::class);
    Route::resource('/pages', PageController::class);
    Route::resource('/settings', SettingsController::class);
    Route::resource('/users', UserController::class);
    Route::resource('/sections', SectionController::class);
    Route::resource('/images', ImagesController::class);
    Route::resource('/audios', AudioController::class);
    Route::resource('/comments', CommentsController::class);
    Route::resource('/messages', MessageController::class);
    Route::resource('/schedules', ScheduleController::class);
});

// Route::get('/admin', function () {
//     return Inertia::render('BackEnd/home');
// })->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';
