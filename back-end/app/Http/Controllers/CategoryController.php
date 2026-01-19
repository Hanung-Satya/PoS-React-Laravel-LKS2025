<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::all();

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Didapat',
            'data' => $categories
        ], 201);
    }

    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|unique:categories,name'
        ]);

        $category = Category::create([
            'name' => $validated['name']
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Disimpan',
            'data' => $category
        ], 201);
    }

    public function update(Request $request,$id) {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Data Tidak Ditemukan',
                'erors' => 'Cannot Find Data'
            ]);
        }

        $validated = $request->validate([
            'name' => 'required|unique:categories,name' . $category->id
        ]);

        $category = Category::update([
            'name' => $validated['name']
        ]);

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Disimpan',
            'data' => $category
        ]);
    }

    public function delete(Request $request, $id) {
        $category = Category::find($id);

        if(!$category) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Data Tidak Ditemukan',
                'erors' => 'Cannot Find Data'
            ], 401);
        }

        $category->delete();

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Dihapus',
            'data' => null
        ],200);
    }
}
