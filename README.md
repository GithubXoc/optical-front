# Optical Store Management System

A comprehensive, modern web application for managing a Mongolian optical store, built with React, TypeScript, and Tailwind CSS.

## 🌟 Features

### 👥 Dual Role System
- **Admin (Store Staff)** - Complete inventory management, sales recording, and analytics
- **Customer** - Product browsing, price checking, appointment booking, and promotions

### 📊 Dashboard & Analytics
- **KPI Cards**: Total sales, items sold, top products, low stock alerts
- **Interactive Charts**: Daily sales trends, category distribution, revenue forecasting
- **Real-time Data**: Live updates and comprehensive reporting

### 📦 Inventory Management
- **Complete Product Tracking**: Beginning stock, additions, removals, sales, ending stock
- **Advanced Filtering**: By category, low stock alerts, search functionality
- **Product Management**: Add, edit, and manage product information

### 💰 Sales Management
- **Point of Sale**: Easy product selection and quantity management
- **Customer Tracking**: Optional customer name recording
- **Daily Totals**: Real-time sales calculation and reporting

### 👓 Product Catalog
- **Customer View**: Beautiful product cards with images and descriptions
- **Advanced Search**: Filter by category, price, stock levels
- **Sorting Options**: Multiple sorting criteria for better user experience

### 🤖 AI Insights
- **Smart Recommendations**: Restock alerts, promotion suggestions, trend analysis
- **Forecasting**: AI-powered sales predictions and trend analysis
- **Performance Metrics**: AI recommendation accuracy and impact tracking

### 📅 Appointment Booking
- **Customer Scheduling**: Easy appointment booking with time slot selection
- **Service Types**: Eye exams, lens replacement, frame changes, consultations
- **Status Tracking**: Pending, confirmed, completed, cancelled statuses

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Charts**: Recharts for data visualization
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Optimization**: React Compiler

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui base components
│   ├── Dashboard.tsx    # Main dashboard with charts
│   ├── InventoryTable.tsx # Inventory management
│   ├── SalesForm.tsx    # Sales entry form
│   ├── ProductCatalog.tsx # Customer product view
│   ├── AIInsights.tsx  # AI recommendations
│   ├── AppointmentForm.tsx # Booking system
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── Navbar.tsx      # Top navigation
├── pages/               # Page components
│   ├── DashboardPage.tsx
│   ├── InventoryPage.tsx
│   ├── SalesPage.tsx
│   ├── CatalogPage.tsx
│   ├── AIPage.tsx
│   └── BookingPage.tsx
├── data/                # Mock data
│   ├── mockProducts.ts
│   └── mockSales.ts
├── types/               # TypeScript definitions
│   └── index.ts
├── lib/                 # Utilities
│   └── utils.ts
├── App.tsx              # Main app component
└── main.tsx            # App entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- pnpm (install with `npm install -g pnpm`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd optical-front
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📱 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## 🎨 UI Components

The application uses shadcn/ui components with a custom design system:

- **Cards**: Information display and grouping
- **Tables**: Data presentation with sorting and filtering
- **Buttons**: Various styles and states
- **Inputs**: Form controls with validation
- **Charts**: Interactive data visualizations

## 🌍 Internationalization

The application supports both Mongolian and English languages:
- **Mongolian (🇲🇳)**: Primary language for local customers
- **English (🇬🇧)**: Secondary language for international users

## 📊 Data Visualization

### Chart Types
- **Line Charts**: Daily sales trends and forecasting
- **Pie Charts**: Category sales distribution
- **Bar Charts**: Revenue comparisons and analytics

### Key Metrics
- Total sales revenue (₮)
- Items sold count
- Top performing products
- Low stock alerts
- AI recommendation accuracy

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with:
- Dark/light mode support
- Custom color palette
- Responsive design utilities
- Component-specific styling

### React Compiler
Automatic optimization enabled for:
- Component memoization
- Performance improvements
- Bundle size reduction

## 📈 Features in Detail

### Dashboard
- Real-time KPI monitoring
- Interactive chart visualizations
- Top products and low stock alerts
- Sales trend analysis

### Inventory Management
- Complete stock tracking
- Product information management
- Category-based organization
- Search and filter capabilities

### Sales Entry
- Intuitive product selection
- Quantity management
- Customer information tracking
- Real-time total calculation

### Product Catalog
- Customer-friendly product display
- Advanced search and filtering
- Sorting options
- Stock availability indicators

### AI Insights
- Smart restock recommendations
- Promotion suggestions
- Sales trend analysis
- Performance forecasting

### Appointment Booking
- Easy scheduling interface
- Service type selection
- Time slot availability
- Status tracking

## 🎯 Future Enhancements

- **Authentication System**: User login and role management
- **Database Integration**: Real data persistence
- **Payment Processing**: Online payment integration
- **Mobile App**: React Native version
- **Advanced Analytics**: More detailed reporting
- **Multi-store Support**: Chain store management

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the development team.

---

**Built with ❤️ for the Mongolian optical industry**