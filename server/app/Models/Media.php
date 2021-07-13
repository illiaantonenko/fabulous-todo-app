<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Media extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static $typeProfile = 'profile';

    public static function createFromLink(string $url)
    {
        $info = pathinfo($url);
        $contents = file_get_contents($url);
        $tmpFile = '/tmp/' . $info['basename'];
        file_put_contents($tmpFile, $contents);

        $uploaded_file = new UploadedFile($tmpFile, $info['basename']);
        if($path = $uploaded_file->store("public")){
            $pathInfo = pathinfo($path);

            return new Media([
                'name' => $pathInfo['filename'],
                'path' => $path,
                'extension' => $pathInfo['extension'],
                'type' => Media::$typeProfile
            ]);
        }else{
            return  false;
        }
    }

    /*==================== RELATIONS ====================*/

    public function media_gallery()
    {
        return $this->belongsTo(MediaGallery::class);
    }

    /*==================== END RELATIONS ====================*/
}
