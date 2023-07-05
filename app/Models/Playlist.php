<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use HasFactory;
    
    protected $table = 'playlists';

    protected $fillable = [
        'title',
        'slug',
        'gender',
        'description',
        'active',
        'cover'
    ];

    public function audios() {
        return $this->belongsToMany(Audio::class);
    }

}
