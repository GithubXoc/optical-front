import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { mockProducts } from '../data/mockProducts';
import type { Product, Sale } from '../types';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

const SalesForm: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [sales, setSales] = useState<Sale[]>([]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && selectedProduct && newQuantity <= selectedProduct.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddSale = () => {
    if (!selectedProduct) return;

    const newSale: Sale = {
      id: Date.now(),
      productId: selectedProduct.id,
      quantity,
      date: new Date().toISOString().split('T')[0],
      total: selectedProduct.price * quantity,
      customerName: customerName || undefined
    };

    setSales(prev => [...prev, newSale]);
    setCustomerName('');
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleRemoveSale = (saleId: number) => {
    setSales(prev => prev.filter(sale => sale.id !== saleId));
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalItems = sales.reduce((sum, sale) => sum + sale.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Product Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Борлуулалт бүртгэх</CardTitle>
          <CardDescription>
            Бүтээгдэхүүн сонгоод борлуулалт бүртгэнэ үү
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Product Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockProducts.map((product) => (
              <div
                key={product.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedProduct?.id === product.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:bg-accent'
                }`}
                onClick={() => handleProductSelect(product)}
              >
                <div className="space-y-2">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <p className="font-semibold">₮{product.price.toLocaleString()}</p>
                  <p className="text-sm">
                    Үлдэгдэл: <span className={product.stock < 10 ? 'text-destructive' : 'text-green-600'}>
                      {product.stock} ширхэг
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Product Details */}
          {selectedProduct && (
            <div className="p-4 border rounded-lg bg-accent/50">
              <h3 className="font-semibold mb-2">Сонгосон бүтээгдэхүүн: {selectedProduct.name}</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Худалдан авагчийн нэр (сонгох)</label>
                  <Input
                    placeholder="Худалдан авагчийн нэр..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Тоо ширхэг</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="text-center"
                      min="1"
                      max={selectedProduct.stock}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= selectedProduct.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-background rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Нийт дүн:</span>
                  <span className="text-xl font-bold text-primary">
                    ₮{(selectedProduct.price * quantity).toLocaleString()}
                  </span>
                </div>
              </div>

              <Button onClick={handleAddSale} className="w-full mt-4 gap-2">
                <ShoppingCart className="h-4 w-4" />
                Борлуулалт нэмэх
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Sales */}
      {sales.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Өнөөдрийн борлуулалт</CardTitle>
            <CardDescription>
              Нийт: ₮{totalRevenue.toLocaleString()} | {totalItems} ширхэг
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sales.map((sale) => {
                const product = mockProducts.find(p => p.id === sale.productId);
                return (
                  <div key={sale.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{product?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {sale.quantity} ширхэг × ₮{product?.price.toLocaleString()}
                        {sale.customerName && ` | ${sale.customerName}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">₮{sale.total.toLocaleString()}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSale(sale.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 p-4 bg-primary/5 rounded-lg">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Нийт дүн:</span>
                <span className="text-primary">₮{totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalesForm;
