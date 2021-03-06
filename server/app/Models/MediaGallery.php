<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Http;

class MediaGallery extends Model
{
//    use HasFactory;

    protected $guarded = [];

    public static $typeProfile = 'profile';

    /*==================== RELATIONS ====================*/

    public function medias()
    {
        return $this->hasMany(Media::class);
    }

    public function user()
    {
        return $this->morphTo();
    }

    /*==================== END RELATIONS ====================*/
}
