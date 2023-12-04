<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/posts', [PostController::class, 'index']);

Route::post('/post', [PostController::class, 'store']);

Route::get('/post/{id}', [PostController::class, 'show']);

Route::delete('/post/{id}', [PostController::class, 'destroy']);

Route::put('/post/{id}', [PostController::class, 'update']);