<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Http;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Validator;

class AuthController extends Controller
{
    /*==================== STATIC METHODS ====================*/

    public static function getSocialProviderList()
    {
        return implode('|', [
            'google'
        ]);
    }

    /*==================== STATIC METHODS ====================*/

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

        $response = $this->passportAuthorise($request->email, $request->password);
        $response->message = 'Logged in successfully';
        return response()->json($response);
    }

    public function register(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        if ($validation->fails()){
            return response()->json(['errors' => $validation->errors()]);
        } else {
            $user = new User;
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            if ($user->save()){
                Auth::login($user);

                $response = $this->passportAuthorise($request->email, $request->password);
                $response->message = 'Successfully created user';
                return response()->json($response);
            }
            return response()->json([
                'message' => 'User not created'
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json([
            'message' => 'Successfully logged out']);
    }

    public function socialRedirect($provider)
    {
        switch ($provider) {
            case 'google':
                return response()->json(['link' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl()]);
            default:
                abort(404);
        }
    }

    public function socialCallback($provider)
    {
        $user = Socialite::driver($provider)->stateless()->user();
        return response()->json([
            'user' => $user
        ]);
    }

    /*==================== PRIVATE METHODS ====================*/
    /**
     * @param $email
     * @param $password
     * @return object
     */
    private function passportAuthorise($email, $password)
    {
        return Http::asForm()->post(config('services.passport.login_endpoint'), [
            'grant_type' => 'password',
            'client_id' => config('services.passport.client_id'),
            'client_secret' => config('services.passport.client_secret'),
            'username' => $email,
            'password' => $password
        ])->object();
    }
    /*==================== END PRIVATE METHODS ====================*/
}
