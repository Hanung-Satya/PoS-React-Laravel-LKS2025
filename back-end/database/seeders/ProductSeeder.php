<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Nasi Goreng',
                'category_id' => 1,
                'price' => 15000,
                'stock' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ayam Geprek',
                'category_id' => 1,
                'price' => 18000,
                'stock' => 40,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Es Teh',
                'category_id' => 2,
                'price' => 5000,
                'stock' => 100,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Es Jeruk',
                'category_id' => 2,
                'price' => 7000,
                'stock' => 80,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Kentang Goreng',
                'category_id' => 3,
                'price' => 12000,
                'stock' => 60,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
