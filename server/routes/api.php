<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->name('auth.')->group(function () {

    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');

    Route::middleware('auth:api')->group(function () {
        Route::get('logout', [AuthController::class, 'logout']);
    });

    Route::get('{provider}/redirect', [AuthController::class, 'socialRedirect'])->where('provider', AuthController::getSocialProviderList());
    Route::get('{provider}/callback', [AuthController::class, 'socialCallback'])->where('provider', AuthController::getSocialProviderList());

});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->json($request->user());
});
