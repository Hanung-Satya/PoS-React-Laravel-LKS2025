<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credentials = $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
            'status' => 'Error',
            'message' => 'Permintaan tidak valid',
            'erors' => 'Unauthorized'
        ], 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Disimpan',
            'token' => $token
        ], 201);
    }

    public function logout(Request $request) {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response()->json([
            'status' => 'Success',
            'message' => 'Logout Berhasil'
        ], 200);
    }
}
