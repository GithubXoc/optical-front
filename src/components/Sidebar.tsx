import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Eye, 
  Brain, 
  Calendar,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Хяналтын самбар', labelEn: 'Dashboard' },
    { path: '/inventory', icon: Package, label: 'Бараа материалын', labelEn: 'Inventory' },
    { path: '/sales', icon: ShoppingCart, label: 'Борлуулалт', labelEn: 'Sales' },
    { path: '/catalog', icon: Eye, label: 'Бүтээгдэхүүн', labelEn: 'Catalog' },
    { path: '/ai', icon: Brain, label: 'AI зөвлөгөө', labelEn: 'AI Insights' },
    { path: '/booking', icon: Calendar, label: 'Цаг товлох', labelEn: 'Booking' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-card border-r transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-primary">Optical Store</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Make nav take up remaining space and push buttons to bottom */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[40px]",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                onClick={() => {
                  // Close mobile menu when clicking a link
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
              >
                <Icon className="h-5 w-5" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4">
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 min-h-[40px]">
              <Settings className="h-5 w-5" />
              <span className="truncate">Тохиргоо</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive min-h-[40px]">
              <LogOut className="h-5 w-5" />
              <span className="truncate">Гарах</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
