<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\MorphOne;
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
        'slug',
        'email',
        'password',
        'google_id',
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

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        if (!$this->slug){
            $this->slug = $this->getNewSlug();
        }
    }

    /*==================== STATIC ====================*/

    private function getNewSlug()
    {
        return 'User'.Carbon::now()->timestamp;
    }

    /*==================== END STATIC ====================*/

    /*==================== RELATIONS ====================*/

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function media_galleries()
    {
        return $this->morphMany(MediaGallery::class, 'media_galleryable');
    }

    /**
     * @return MorphOne
     */
    public function profile_gallery()
    {
        return $this->morphOne(MediaGallery::class, 'media_galleryable')
            ->where('type', MediaGallery::$typeProfile);
    }

    /**
     * @return HasOneThrough
     */
    public function profile_media()
    {
        return $this->hasOneThrough(Media::class, MediaGallery::class, 'media_galleryable_id')
            ->where('media_galleryable_type', static::class)
            ->where('media.type', Media::$typeMainProfile);
    }

    /*==================== END RELATIONS ====================*/

    public function saveProfilePhoto(Media $media)
    {
        $media->type = Media::$typeMainProfile;
        $media->media_gallery()->associate($this->profile_gallery);
        $media->save();

        return $media;
    }
}
