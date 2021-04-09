<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Carbon\Carbon;
use Http;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);

        $response = Http::asForm()->post(config('services.passport.login_endpoint'), [
            'grant_type' => 'password',
            'client_id' => config('services.passport.client_id'),
            'client_secret' => config('services.passport.client_secret'),
            'username' => $request->email,
            'password' => $request->password
        ]);
        return $response->json();
    }

    public function register(Request $request)
    {
        $validation = \Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        if ($validation->fails()){
            return response()->json(['errors' =>$validation->errors()]);
        } else {
            $user = new User;
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            if ($user->save()){
                Auth::login($user);
                $tokenResult = $user->createAccessToken($request->remember_me);

                return response()->json([
                    'message' => 'Successfully created user!',
                    'access_token' => $tokenResult,
                    'token_type' => 'Bearer',
//                    'expires_at' => Carbon::parse(
//                        $tokenResult->token->expires_at
//                    )->toDateTimeString()
                ], 201);
            }
            return response()->json([
                'message' => 'User not created'
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out']);
    }
}
