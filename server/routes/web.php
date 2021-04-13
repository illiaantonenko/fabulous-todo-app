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
    return response()->json(User::all());
});

Route::prefix('auth')->name('auth.')->group(function () {
    //For test purposes
    Route::get('{provider}/redirect', [AuthController::class, 'socialRedirectWeb'])->where('provider', AuthController::getSocialProviderList());
});
