# LiLas Coffee Admin Dashboard

A comprehensive admin dashboard for managing the LiLas Coffee e-commerce platform.

## Features

### 🔐 Authentication
- Secure login system with role-based access control
- Admin and Manager roles with different permissions
- Session management with localStorage persistence

### 📊 Dashboard Overview
- Key performance metrics (revenue, orders, customers, products)
- Recent orders requiring attention
- Top-performing products
- Real-time statistics with trend indicators

### 📦 Product Management
- Complete CRUD operations for products
- Inventory tracking and stock management
- Product status management (active, inactive, out of stock)
- Featured product controls
- Advanced filtering and search

### 🛒 Order Management
- View all customer orders with detailed information
- Order status tracking (pending, processing, shipped, delivered, cancelled)
- Payment status monitoring
- Customer information and shipping details
- Order filtering and search capabilities

### 📈 Analytics & Reporting
- Revenue and sales analytics
- Customer growth metrics
- Product performance tracking
- Recent activity feed
- Exportable reports

### ⚙️ Settings & Configuration
- User profile management
- Notification preferences
- Shop configuration (currency, tax rates, shipping)
- Payment method settings
- Security settings

## Access

### Demo Credentials
- **Admin**: `admin@lilas.com` / `admin123`
- **Manager**: `manager@lilas.com` / `admin123`

### Access Points
1. **Direct URL**: Navigate to `/admin/login`
2. **Header Icon**: Click the settings icon in the main site header (when logged in)
3. **Bookmark**: Save `/admin` for quick access

## Technical Implementation

### Frontend
- **React 18** with TypeScript
- **React Router 6** for navigation
- **TailwindCSS** for styling
- **Radix UI** components
- **Framer Motion** for animations
- **React Hook Form** with Zod validation

### Backend
- **Express.js** API endpoints
- **RESTful** API design
- **Mock authentication** (JWT-ready)
- **Type-safe** shared interfaces

### Security
- Protected routes with authentication checks
- Role-based access control
- Secure token handling
- Input validation and sanitization

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login

### Dashboard
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/analytics` - Analytics data

### Products
- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Orders
- `GET /api/admin/orders` - List all orders
- `GET /api/admin/orders/:id` - Get specific order
- `PUT /api/admin/orders/:id` - Update order status

## Development

### Running the Dashboard
1. Start the development server: `pnpm dev`
2. Navigate to `http://localhost:8080/admin/login`
3. Use demo credentials to access the dashboard

### Adding New Features
1. Create new components in `client/components/admin/`
2. Add new pages in `client/pages/admin/`
3. Create API endpoints in `server/routes/admin.ts`
4. Update routing in `client/App.tsx`

### Customization
- Modify the design system in `client/global.css`
- Update brand colors in `tailwind.config.ts`
- Add new UI components to `client/components/ui/`

## Production Deployment

### Environment Variables
```env
# Add to your .env file
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret-key
```

### Security Considerations
- Replace mock authentication with proper JWT implementation
- Implement proper password hashing (bcrypt)
- Add rate limiting for login attempts
- Enable HTTPS in production
- Implement proper CORS policies

### Database Integration
- Replace mock data with real database connections
- Implement proper data validation
- Add database migrations
- Set up backup and recovery procedures

## Support

For technical support or feature requests, please refer to the main project documentation or contact the development team.
