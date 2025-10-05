import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { AIInsight } from '../types';

const AIInsights: React.FC = () => {
  // Mock AI insights data
  const aiInsights: AIInsight[] = [
    {
      id: 1,
      type: 'restock',
      title: 'Persol 649 барааны үлдэгдэл бага',
      description: 'Энэ барааны үлдэгдэл 3 ширхэг болж, дараагийн 2 долоо хоногт дуусах магадлалтай.',
      priority: 'high',
      action: 'Нэн даруй нөөцлөх'
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Chanel CH3180-д хямдрал зарлах',
      description: 'Энэ барааны борлуулалт сүүлийн 2 сард буурч байна. Хямдрал зарлавал борлуулалт нэмэгдэх боломжтой.',
      priority: 'medium',
      action: '15% хямдрал зарлах'
    },
    {
      id: 3,
      type: 'trend',
      title: 'Sunglasses ангиллын борлуулалт өсч байна',
      description: 'Сүүлийн 30 хоногт sunglasses ангиллын борлуулалт 25% өссөн. Энэ тренд үргэлжлэх боломжтой.',
      priority: 'low',
      action: 'Нэмэлт нөөцлөх'
    },
    {
      id: 4,
      type: 'forecast',
      title: 'Дараагийн сарын борлуулалтын таамаглал',
      description: 'Дараагийн сард борлуулалт 15% өсөх таамаглалтай. Томоохон захиалга ирэх боломжтой.',
      priority: 'medium',
      action: 'Бэлтгэл хангах'
    }
  ];

  // Mock forecast data
  const forecastData = [
    { month: '1-р сар', actual: 2500000, forecast: 0 },
    { month: '2-р сар', actual: 2800000, forecast: 0 },
    { month: '3-р сар', actual: 3200000, forecast: 0 },
    { month: '4-р сар', actual: 2900000, forecast: 0 },
    { month: '5-р сар', actual: 0, forecast: 3300000 },
    { month: '6-р сар', actual: 0, forecast: 3600000 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-destructive border-destructive bg-destructive/5';
      case 'medium':
        return 'text-yellow-600 border-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 border-green-600 bg-green-50';
      default:
        return 'text-muted-foreground border-border bg-muted';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5" />;
      case 'medium':
        return <Target className="h-5 w-5" />;
      case 'low':
        return <Lightbulb className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'restock':
        return <AlertTriangle className="h-4 w-4" />;
      case 'promotion':
        return <TrendingUp className="h-4 w-4" />;
      case 'trend':
        return <BarChart3 className="h-4 w-4" />;
      case 'forecast':
        return <Brain className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                AI зөвлөгөө
              </CardTitle>
              <CardDescription>
                Хиймэл оюуны шинжилгээнд үндэслэсэн зөвлөмжүүд
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Шинэчлэх
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* AI Insights Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {aiInsights.map((insight) => (
          <Card key={insight.id} className={`border-l-4 ${getPriorityColor(insight.priority)}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(insight.type)}
                  <CardTitle className="text-base">{insight.title}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  {getPriorityIcon(insight.priority)}
                  <span className="text-xs font-medium capitalize">{insight.priority}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{insight.description}</p>
              
              {insight.action && (
                <div className="p-3 bg-background rounded-lg border">
                  <p className="text-sm font-medium">Санал болгож буй үйлдэл:</p>
                  <p className="text-sm text-primary">{insight.action}</p>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Хэрэгжүүлэх
                </Button>
                <Button variant="outline" size="sm">
                  Дэлгэрэнгүй
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Борлуулалтын таамаглал
          </CardTitle>
          <CardDescription>
            AI-ийн шинжилгээнд үндэслэсэн ирээдүйн борлуулалтын таамаглал
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `₮${value.toLocaleString()}`, 
                  name === 'actual' ? 'Бодит' : 'Таамаглал'
                ]} 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="actual"
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#82ca9d" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="forecast"
                dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#8884d8] rounded-full"></div>
              <span>Бодит борлуулалт</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#82ca9d] rounded-full"></div>
              <span>AI таамаглал</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>AI зөвлөгөөний гүйцэтгэл</CardTitle>
          <CardDescription>
            Сүүлийн 30 хоногийн AI зөвлөгөөний үр дүн
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">87%</div>
              <div className="text-sm text-muted-foreground">Зөв таамаглал</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-muted-foreground">Зөвлөгөө өгсөн</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">₮2.3M</div>
              <div className="text-sm text-muted-foreground">Нэмэлт орлого</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInsights;
