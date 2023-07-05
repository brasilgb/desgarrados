<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $table = 'galleries';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'active',
        'cover'
    ];

    public function images() {
        return $this->belongsToMany(Image::class);
    }

    // public function albuns()
    // {
    //     return $this->hasMany(Album::class);
    // }

    // public function subCategories()
    // {
    //     return $this->hasMany(Album::class)->with('albuns');
    // }
}
