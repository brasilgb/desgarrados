<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Audio extends Model
{
    use HasFactory;
    
    protected $table = 'audios'; 

    protected $fillable = [
        'title',
        'audio'
    ]; 
    
    public function playlists()
    {
        return $this->belongsToMany(Playlist::class);
    }
}
