<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $guarded = [];

    /*==================== RELATIONS ====================*/

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /*==================== END RELATIONS ====================*/
}
