<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SalesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/profile', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);

    Route::controller(CategoryController::class)->group(function () {
        Route::get('/categories', 'index');
        Route::post('/categories', 'create');
        Route::put('/categories/{id}', 'update');
        Route::delete('/categories/{id}', 'delete');
    });

    Route::controller(ProductController::class)->group(function () {
        Route::get('/products', 'index');
        Route::post('/products', 'create');
        Route::put('/products/{id}', 'update');
        Route::delete('/products/{id}', 'delete');
    });

    Route::controller(SalesController::class)->group(function () {
        Route::get('/sales', 'index');
        Route::post('/sales', 'create');
        Route::get('/sales/{id}', 'show');
        Route::delete('/sales/{id}', 'delete');
        Route::get('/sales-details/{sale_id}', 'salesDetails');
    });
});
