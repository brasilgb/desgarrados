<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $table = 'schedules';

    protected $fillable = [
        'title',
        'slug',
        'state',
        'city',
        'locale',
        'start',
        'end',
        'hend',
        'description',
        'cover',
        'active'
    ];
}
