<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Sales;
use App\Models\SalesDetail;
use Illuminate\Support\Facades\DB;

class SalesDetailsSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {

            $sale = Sales::first();

            $products = Product::take(2)->get();

            $total = 0;

            foreach ($products as $product) {
                $qty = 2;

                // validasi stok
                if ($product->stock < $qty) {
                    continue;
                }

                $subtotal = $product->price * $qty;

                SalesDetail::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'quantity' => $qty,
                    'subtotal' => $subtotal,
                ]);

                // kurangi stok
                $product->decrement('stock', $qty);

                $total += $subtotal;
            }

            // update total harga
            $sale->update([
                'total_price' => $total
            ]);
        });
    }
}
