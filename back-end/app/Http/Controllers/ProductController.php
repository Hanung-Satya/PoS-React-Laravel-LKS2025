<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() {
        $products = Product::with('categories')->get();

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Didapat',
            'data' => $products
        ], 200);
    }

    public function create(Request $request) {
        $validated = $request->validate([
            'name' => 'required|unique:products,name,$id',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'stock' => 'integer|min:1'
        ]);

        // $product = Product::create([
        //     'name' => $validated['name'],
        //     'category_id' => $validated['category_id'],
        //     'price' => $validated['price'],
        //     'stock' => $validated['stock'],
        // ]);

        $product = Product::create($validated);

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Disimpan',
            'data' => $product
        ], 201);
    }

    public function update(Request $request,$id) {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Data Tidak Ditemukan',
                'erors' => 'Cannot Find Data'
            ],401);
        }

        $validated = $request->validate([
            'name' => 'required|unique:products,name,' . $id,
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'stock' => 'integer|min:1'
        ]);

        $product->update($validated);

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Disimpan',
            'data' => $product
        ], 200);
    }

    public function delete(Request $request,$id) {
        $product = Product::find($id);

        if (!$id) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Data Tidak Ditemukan',
                'erors' => 'Cannot Find Data'
            ],401);
        }

        $product->delete();

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Dihapus',
            'data' => null
        ],200);
    }
}
