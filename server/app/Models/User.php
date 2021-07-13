<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\UploadedFile;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function saveProfilePhoto(Media $media)
    {

        $media->media_gallery()->associate($this->profile_gallery()->get()[0]);
        $media->save();

        return $media;
    }

    /*==================== RELATIONS ====================*/

    public function media_galleries()
    {
        return $this->morphMany(MediaGallery::class, 'media_galleryable');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function profile_gallery()
    {
        return $this->morphOne(MediaGallery::class, 'media_galleryable')
            ->where('type', MediaGallery::$typeProfile);
    }

    /*==================== END RELATIONS ====================*/
}
