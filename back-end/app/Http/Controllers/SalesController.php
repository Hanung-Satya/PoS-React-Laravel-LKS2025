<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sales;
use App\Models\SalesDetail;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function index()
    {
        $sales = Sales::with('user', 'details.product')->get();

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Didapat',
            'data' => $sales
        ], 200);
    }

    public function create(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            $totalPrice = 0;

            $sale = Sales::create([
                'user_id' => $request->user()->id,
                'total_price' => 0
            ]);

            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    throw new Exception('Stock {$product->name} tidak cukup');
                }

                $subtotal = $product->price * $item['quantity'];
                $totalPrice += $subtotal;

                SalesDetail::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'subtotal' => $subtotal,
                ]);

                $product->decrement('stock', $item['quantity']);
            }

            $sale->update([
                'total_price' => $totalPrice
            ]);

            DB::commit();

            return response()->json([
                'status' => 'Success',
                'message' => 'Data Berhasil Didapat',
                'data' => $sale->load('details.product')
            ], 201);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function show($id) {
        $sales = Sales::with('user', 'details.product')->find($id);

        if (!$sales) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Data Tidak Ditemukan',
                'erors' => 'Cannot Find Data'
            ],401);
        }

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Ditemukan',
            'data' => $sales
        ], 200);
    }

    public function delete(Request $request, $id) {
        $sales = Sales::with('user', 'details.product')->find($id);

        if (!$sales) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Data Tidak Ditemukan',
                'erors' => 'Cannot Find Data'
            ],401);
        }

        $sales->delete();

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Dihapus',
            'data' => null
        ],200);
    }

    public function salesDetails($sale_id) {
        $sales = SalesDetail::with('product')->where('sale_id', $sale_id)->get();

        return response()->json([
            'status' => 'Success',
            'message' => 'Data Berhasil Ditemukan',
            'data' => $sales
        ], 200);
    }

}
