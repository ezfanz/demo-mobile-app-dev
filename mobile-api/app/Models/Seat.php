<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    protected $fillable = ['cinema_hall_id', 'row', 'number', 'status', 'locked_by', 'locked_at'];

    public function cinemaHall()
    {
        return $this->belongsTo(CinemaHall::class);
    }

    public function booking()
    {
        return $this->hasOne(Booking::class);
    }
}
