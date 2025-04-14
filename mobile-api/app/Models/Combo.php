<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Combo extends Model
{
    protected $fillable = ['name', 'description', 'price'];

    public function bookings()
    {
        return $this->belongsToMany(Booking::class)->withPivot('quantity')->withTimestamps();
    }
}
