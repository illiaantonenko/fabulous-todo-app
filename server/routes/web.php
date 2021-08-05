<?php

use App\Http\Controllers\Auth\AuthController;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return response()->json(User::with(['profile', 'profile_media'])->get());
});
Route::get('/user/{slug}', [\App\Http\Controllers\UserController::class, 'show']);

Route::get('/media/{media}', function (\App\Models\Media $media) {
    return response()->redirectTo(\Storage::url($media->path));
});

Route::prefix('auth')->name('auth.')->group(function () {
    //TODO: For test purposes. Remove on frontend sync
    Route::get('{provider}/redirect', [AuthController::class, 'socialRedirectWeb'])->where('provider', AuthController::getSocialProviderList());
});
