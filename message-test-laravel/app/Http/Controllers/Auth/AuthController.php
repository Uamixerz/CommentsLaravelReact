<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Services\Image\Service;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
class AuthController extends Controller
{
    public $service;
    public function __construct(Service $serviceGet)
    {
        $this->service = $serviceGet;
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * @OA\Post(
     ** path="/api/auth/login",
     *   tags={"Auth"},
     *   summary="Login",
     *   operationId="login",
     *
     *   @OA\Parameter(
     *      name="email",
     *      in="query",
     *      required=true,
     *      @OA\Schema(
     *           type="string"
     *      )
     *   ),
     *   @OA\Parameter(
     *      name="password",
     *      in="query",
     *      required=true,
     *      @OA\Schema(
     *          type="string"
     *      )
     *   ),
     *   @OA\Response(
     *      response=200,
     *       description="Success",
     *      @OA\MediaType(
     *           mediaType="application/json",
     *      )
     *   ),
     *   @OA\Response(
     *      response=401,
     *       description="Unauthenticated"
     *   ),
     *   @OA\Response(
     *      response=400,
     *      description="Bad Request"
     *   ),
     *   @OA\Response(
     *      response=404,
     *      description="not found"
     *   ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     *)
     **/


    public function login(LoginRequest $request){
        try {
            $data = $request->validated();
            if (! $token = auth()->attempt($data)) {
                return response()->json(['error' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
            }
            return $this->createNewToken($token);
        } catch (ValidationException $exception) {
            throw new HttpResponseException(response()->json(['errors' => $exception->errors()], 422));
        }
    }

    /**
     * @OA\Post(
     *     tags={"Auth"},
     *     path="/api/auth/register",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"email", "name","image", "password"},
     *                 @OA\Property(
     *                     property="image",
     *                     type="string",
     *                     format="binary"
     *                 ),
     *                 @OA\Property(
     *                     property="email",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="password",
     *                     type="string"
     *                 ),
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Register")
     * )
     */


    public function register(RegisterRequest $request) {
        try {
            $data = $request->validated();
            $fileName = $this->service->storeUserImage($request->file('image'));
            $user = User::create(array_merge(
                $data,
                ['password' => bcrypt($request->password),
                    'image'=>$fileName,
                    'homepage'=>$request->input('homepage') ?? '']
            ));

            return response()->json([
                'message' => 'User successfully registered',
                'user' => $user
            ], Response::HTTP_CREATED);
        } catch (ValidationException $exception) {
            throw new HttpResponseException(response()->json(['errors' => $exception->errors()], 422));
        }
    }

    /**
     * @OA\Post(
     *     path="/api/auth/logout",
     *     tags={"Auth"},
     *     security={{"apiAuth":{}}},
     *     @OA\Response(response="200", description="Display a listing of projects.")
     * )
     */

    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out'], Response::HTTP_OK);
    }


    /**
     * @OA\Post(
     *     path="/api/auth/refresh",
     *     tags={"Auth"},
     *     security={{"apiAuth":{}}},
     *     @OA\Response(response="200", description="Display a listing of projects.")
     * )
     */

    public function refresh() {
        return $this->createNewToken(auth()->refresh(), Response::HTTP_OK);
    }


    /**
     * @OA\Get(
     *     path="/api/auth/user-profile",
     *     tags={"Auth"},
     *     security={{"apiAuth":{}}},
     *     @OA\Response(response="200", description="Display a listing of projects.")
     * )
     */

    public function userProfile() {
        return response()->json(auth()->user(), Response::HTTP_OK);
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
//            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60 * 24 * 7,
//            'user' => auth()->user()
        ], Response::HTTP_OK);
    }
}
