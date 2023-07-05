<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $table = 'images'; 

    protected $fillable = [
        'title',
        'description',
        'image'
    ]; 
    
    public function galleries()
    {
        return $this->belongsToMany(Gallery::class);
    }
}
