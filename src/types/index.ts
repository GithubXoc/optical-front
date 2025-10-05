export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  image?: string;
  description?: string;
  beginningStock: number;
  added: number;
  removed: number;
  endingStock: number;
};

export type Sale = {
  id: number;
  productId: number;
  quantity: number;
  date: string;
  total: number;
  customerName?: string;
};

export type Appointment = {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
};

export type DashboardStats = {
  totalSales: number;
  totalItemsSold: number;
  topProducts: Product[];
  lowStockAlerts: Product[];
};

export type ChartData = {
  name: string;
  value: number;
  date?: string;
};

export type AIInsight = {
  id: number;
  type: 'restock' | 'promotion' | 'trend' | 'forecast';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  action?: string;
};

export type User = {
  id: number;
  name: string;
  role: 'admin' | 'customer';
  email: string;
};
