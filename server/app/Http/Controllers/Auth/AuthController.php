<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use GuzzleHttp\Psr7\Response;
use Http;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Validator;

class AuthController extends Controller
{
    static $socialProviders = [
        'google'
    ];

    /*==================== STATIC METHODS ====================*/

    public static function getSocialProviderList()
    {
        return implode('|', static::$socialProviders);
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
        if (in_array($provider, static::$socialProviders)){
            return response()->json(['link' => Socialite::driver($provider)->redirect()->getTargetUrl()]);
        }
        abort(404);
    }

    public function socialRedirectWeb($provider)
    {
        if (in_array($provider, static::$socialProviders)){
            return view('test', ['provider' => $provider, 'link' => Socialite::driver($provider)->stateless()->redirect()->getTargetUrl()]);
        }
        abort(404);
    }

    public function socialCallback($provider)
    {
        $user = Socialite::driver($provider)->stateless()->user();

        $existingUser = User::where('email', $user->email)->first();
        if ($existingUser){
            auth()->login($existingUser, true);
        } else {
            $newUser = new User;
            $newUser->first_name = $user->user['given_name'];
            $newUser->last_name = $user->user['family_name'];
            $newUser->email = $user->email;
            $newUser->google_id = $user->id;
            $newUser->profile_photo = $user->avatar_original;
            $newUser->save();
            auth()->login($newUser, true);
        }
//        return redirect()->to('/home');
        return response()->json([
            'user' => $newUser ?? $existingUser
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
        try {
            $response = Http::asForm()->post(url(config('services.passport.login_endpoint')), [
                'grant_type' => 'password',
                'client_id' => config('services.passport.client_id'),
                'client_secret' => config('services.passport.client_secret'),
                'username' => $email,
                'password' => $password
            ]);
        } catch (\Exception $exception){
            abort($exception->getCode(), $exception->getMessage());
        }
        $response->onError(function ($response) {
            /** @var Response $response */
            abort($response->getStatusCode(), $response->getReasonPhrase());
        });

        return $response->object();
    }
    /*==================== END PRIVATE METHODS ====================*/
}
