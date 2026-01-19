<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sales;
use App\Models\User;

class SalesSeeder extends Seeder
{
    public function run(): void
    {
        Sales::create([
            'user_id' => 1, // admin
            'total_price' => 0, // nanti diupdate dari detail
        ]);
    }
}
