<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = ['seat_id', 'user_id', 'cinema_hall_id', 'booking_time'];

    public function seat()
    {
        return $this->belongsTo(Seat::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function combos()
    {
        return $this->belongsToMany(Combo::class)->withPivot('quantity')->withTimestamps();
    }
}
