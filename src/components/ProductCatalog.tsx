import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';
import { Search, Eye, ShoppingCart } from 'lucide-react';

const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  const filteredAndSortedProducts = mockProducts
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'stock':
          aValue = a.stock;
          bValue = b.stock;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

  const handleViewProduct = (product: Product) => {
    console.log('View product:', product);
  };

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Бүтээгдэхүүний каталог</CardTitle>
          <CardDescription>
            Бүх боломжтой бүтээгдэхүүнийг харж, хайж олоорой
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Бүтээгдэхүүн хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                <option value="">Бүх ангилал</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as 'name' | 'price' | 'stock');
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              >
                <option value="name-asc">Нэр (A-Z)</option>
                <option value="name-desc">Нэр (Z-A)</option>
                <option value="price-asc">Үнэ (багаас их)</option>
                <option value="price-desc">Үнэ (ихээс бага)</option>
                <option value="stock-asc">Үлдэгдэл (багаас их)</option>
                <option value="stock-desc">Үлдэгдэл (ихээс бага)</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground mb-4">
            {filteredAndSortedProducts.length} бүтээгдэхүүн олдлоо
          </div>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAndSortedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square bg-muted flex items-center justify-center">
              <Eye className="h-12 w-12 text-muted-foreground" />
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                
                {product.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-primary">
                      ₮{product.price.toLocaleString()}
                    </p>
                    <p className="text-sm">
                      Үлдэгдэл: <span className={
                        product.stock < 10 ? 'text-destructive' : 
                        product.stock < 20 ? 'text-yellow-600' : 
                        'text-green-600'
                      }>
                        {product.stock} ширхэг
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleViewProduct(product)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Дэлгэрэнгүй
                  </Button>
                  
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Сагсанд
                  </Button>
                </div>
                
                {product.stock === 0 && (
                  <div className="text-center text-sm text-destructive font-medium">
                    Боломжгүй
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedProducts.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Бүтээгдэхүүн олдсонгүй</h3>
            <p className="text-muted-foreground text-center">
              Хайлтын нөхцөлөө өөрчилж үзээрэй
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductCatalog;
