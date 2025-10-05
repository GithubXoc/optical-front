import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { Edit, Plus, Search } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';

const InventoryTable: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditProduct = (product: Product) => {
    // In a real app, this would open a modal or navigate to edit page
    console.log('Edit product:', product);
  };

  const handleAddProduct = () => {
    // In a real app, this would open a modal or navigate to add page
    console.log('Add new product');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Бараа материалын хяналт</CardTitle>
          <CardDescription>
            Бүх бүтээгдэхүүний үлдэгдэл, борлуулалтын мэдээлэл
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
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
              
              <Button onClick={handleAddProduct} className="gap-2">
                <Plus className="h-4 w-4" />
                Нэмэх
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Бүтээгдэхүүн</TableHead>
                  <TableHead>Ангилал</TableHead>
                  <TableHead>Үнэ</TableHead>
                  <TableHead>Эхлэх үлдэгдэл</TableHead>
                  <TableHead>Нэмэгдсэн</TableHead>
                  <TableHead>Хасагдсан</TableHead>
                  <TableHead>Борлуулсан</TableHead>
                  <TableHead>Төгсгөлийн үлдэгдэл</TableHead>
                  <TableHead>Үйлдэл</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        {product.description && (
                          <div className="text-sm text-muted-foreground">
                            {product.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>₮{product.price.toLocaleString()}</TableCell>
                    <TableCell>{product.beginningStock}</TableCell>
                    <TableCell className="text-green-600">+{product.added}</TableCell>
                    <TableCell className="text-red-600">-{product.removed}</TableCell>
                    <TableCell className="text-blue-600">-{product.sold}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        product.endingStock < 10 ? 'text-destructive' : 
                        product.endingStock < 20 ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {product.endingStock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          <div className="mt-4 text-sm text-muted-foreground">
            Нийт {filteredProducts.length} бүтээгдэхүүн харуулж байна
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryTable;
