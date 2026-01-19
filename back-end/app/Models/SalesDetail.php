<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesDetail extends Model
{
    protected $fillable = [
        'sale_id',
        'product_id',
        'quantity',
        'subtotal'
    ];

    public function sale() {
        return $this->belongsTo(Sales::class, 'sale_id');
    }

    public function product() {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
