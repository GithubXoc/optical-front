import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Package, DollarSign, AlertTriangle } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';
import { mockSales as salesData } from '../data/mockSales';

const Dashboard: React.FC = () => {
  // Calculate dashboard stats
  const totalSales = salesData.reduce((sum, sale) => sum + sale.total, 0);
  const totalItemsSold = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
  const lowStockProducts = mockProducts.filter(product => product.stock < 10);
  
  // Top 5 products by sales
  const productSales = mockProducts.map(product => {
    const sales = salesData.filter(sale => sale.productId === product.id);
    const totalSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    return {
      ...product,
      totalSold,
      revenue: totalSold * product.price
    };
  }).sort((a, b) => b.totalSold - a.totalSold).slice(0, 5);

  // Daily sales data for line chart
  const dailySales = salesData.reduce((acc, sale) => {
    const date = sale.date;
    if (!acc[date]) {
      acc[date] = { date, sales: 0 };
    }
    acc[date].sales += sale.total;
    return acc;
  }, {} as Record<string, { date: string; sales: number }>);

  const dailySalesArray = Object.values(dailySales).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Category sales data for pie chart
  const categorySales = mockProducts.reduce((acc, product) => {
    const sales = salesData.filter(sale => sale.productId === product.id);
    const totalSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const revenue = totalSold * product.price;
    
    if (!acc[product.category]) {
      acc[product.category] = 0;
    }
    acc[product.category] += revenue;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categorySales).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт борлуулалт</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₮{totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% өмнөх сараас
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Борлуулсан бараа</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItemsSold}</div>
            <p className="text-xs text-muted-foreground">
              +8% өмнөх сараас
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Дэлгэрэнгүй борлуулалт</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productSales[0]?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              {productSales[0]?.totalSold || 0} ширхэг борлуулсан
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Бага үлдэгдэл</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              барааны үлдэгдэл бага
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Daily Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Өдрийн борлуулалтын тренд</CardTitle>
            <CardDescription>Сүүлийн 7 хоногийн борлуулалт</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySalesArray}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`₮${value.toLocaleString()}`, 'Борлуулалт']} />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Ангилалын борлуулалт</CardTitle>
            <CardDescription>Бүтээгдэхүүний ангилал тус бүрийн борлуулалт</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₮${value.toLocaleString()}`, 'Борлуулалт']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products and Low Stock */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top 5 Products */}
        <Card>
          <CardHeader>
            <CardTitle>Топ 5 бүтээгдэхүүн</CardTitle>
            <CardDescription>Хамгийн их борлуулагдсан бүтээгдэхүүн</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productSales.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.totalSold} ширхэг</p>
                    <p className="text-sm text-muted-foreground">₮{product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Бага үлдэгдэл анхааруулга</CardTitle>
            <CardDescription>10-аас бага үлдэгдэлтэй бараа</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-destructive">{product.stock} ширхэг</p>
                    <p className="text-sm text-muted-foreground">₮{product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
