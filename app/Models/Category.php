<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'parent',
        'slug',
        'title',
        'description',
        'active'
    ];

    public function posts() {
        return $this->belongsToMany(Post::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function subCategories()
    {
        return $this->hasMany(Category::class)->with('categories');
    }
}
