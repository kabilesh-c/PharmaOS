# Implementation Plan

- [-] 1. Project Setup and Configuration

  - Initialize Next.js 14 project with TypeScript and App Router
  - Configure Tailwind CSS with custom design tokens (colors, spacing, typography)
  - Set up ESLint and Prettier
  - Install core dependencies (Zustand, Axios, React Hook Form, Zod, Recharts, shadcn/ui)
  - Create project folder structure (app, components, lib, stores, types)
  - _Requirements: 2.1-2.8_

- [ ] 2. Backend API Setup
  - Initialize Node.js/Express project with TypeScript
  - Configure PostgreSQL database connection
  - Set up Prisma ORM and create initial schema
  - Implement JWT authentication middleware
  - Create base API structure (routes, controllers, services)
  - Set up error handling middleware
  - _Requirements: 1.1-1.3, 24.1-24.4_

- [ ] 3. Database Schema and Models
  - Define Prisma schema for User, Medicine, Batch, Order, OrderItem, Patient, Settings models
  - Create database migrations
  - Implement seed script with mock data for all entities
  - Test database connections and queries
  - _Requirements: 1.1, 24.1_

- [ ] 4. Authentication System
  - Create signup API endpoint with password hashing
  - Create login API endpoint with JWT token generation
  - Implement token verification middleware
  - Create auth service with role-based access control
  - Build frontend auth store with Zustand
  - _Requirements: 1.1-1.7_

- [ ] 5. Landing, Login, and Signup Pages
  - Create landing page with navigation to login/signup
  - Build login page with form validation
  - Build signup page with role selection
  - Implement form handling with React Hook Form and Zod
  - Connect forms to authentication API
  - Add error handling and success redirects
  - _Requirements: 25.1-25.6_

- [ ] 6. Layout Components - Sidebar and TopBar
  - Create Sidebar component with icon-based navigation
  - Implement role-based navigation item visibility
  - Add active state styling (yellow circular background)
  - Create TopBar component with search bar, notification icon, and menu icon
  - Implement fixed positioning and responsive behavior
  - _Requirements: 3.1-3.5, 4.1-4.4_

- [ ] 7. Design System - Core UI Components
  - Create Card component with variants (default, dark, yellow, red, coral)
  - Create Badge component with status variants
  - Create Button component with variants (primary, secondary, ghost, danger)
  - Create reusable Table component
  - Create Tab component for filtering
  - Apply exact Figma design specifications (colors, spacing, shadows, typography)
  - _Requirements: 2.1-2.8_

- [ ] 8. Dashboard API Endpoints
  - Create GET /api/dashboard/overview endpoint
  - Create GET /api/dashboard/medicine-info endpoint
  - Create GET /api/dashboard/recent-orders endpoint with filters
  - Create GET /api/dashboard/stock-alerts endpoint
  - Create GET /api/dashboard/expired endpoint
  - Create GET /api/dashboard/expiring-soon endpoint
  - Create GET /api/dashboard/metrics endpoint
  - Implement role-based data filtering
  - _Requirements: 5.1-5.4, 6.1-6.4, 7.1-7.3, 8.1-8.6, 9.1-9.5, 10.1-10.3, 11.1-11.4, 12.1-12.3_

- [ ] 9. Dashboard - Medicine Info Card
  - Create MedicineInfoCard component with dark background
  - Implement circular visualization with SVG/Canvas
  - Display Available (green), Low stock (yellow), Out of stock (red) counts
  - Add legend on right side
  - Connect to dashboard API
  - _Requirements: 5.1-5.4_

- [ ] 10. Dashboard - Active Salesman Card
  - Create ActiveSalesmanCard component
  - Display 3-4 circular avatars with overlap
  - Add "+X" indicator for additional staff
  - Fetch active users from API
  - _Requirements: 6.1-6.4_

- [ ] 11. Dashboard - Prescriptions Card
  - Create PrescriptionsCard component with yellow background
  - Display patient count and customer count
  - Implement circular progress gauge
  - Style to stand out prominently
  - _Requirements: 7.1-7.3_

- [ ] 12. Dashboard - Recent Orders Card
  - Create RecentOrdersCard component
  - Implement filter tabs (ALL, OPD, IPD, OT)
  - Display table with Patient, Ordered by, Order type, Action columns
  - Add "Sale Now" button with role-based visibility
  - Implement filter switching logic
  - _Requirements: 8.1-8.6_

- [ ] 13. Dashboard - Stock Alert Card
  - Create StockAlertCard component
  - Implement tabs (ALL, LOW STOCK, ZERO STOCK)
  - Display table with Medicine, Brand, Stock, Rack, Status columns
  - Add colored stock badges
  - Implement tab switching and filtering
  - _Requirements: 9.1-9.5_

- [ ] 14. Dashboard - Expired and Expiring Soon Cards
  - Create ExpiredCard component with red gradient background
  - Display expired medicines list with count badge
  - Create ExpiringSoonCard component with coral gradient
  - Implement month filter pills
  - Add count badges and date displays
  - _Requirements: 10.1-10.3, 11.1-11.4_

- [ ] 15. Dashboard - Financial Metrics Cards
  - Create MetricCard component
  - Display Invoices, Paid, Discount, Dues, Refund metrics
  - Add icons and mini trend graphs
  - Implement role-based visibility (hide for Pharmacist)
  - _Requirements: 12.1-12.3_

- [ ] 16. Dashboard Page Integration
  - Create dashboard page layout with grid system
  - Arrange all dashboard cards according to Figma design
  - Implement responsive grid layout
  - Connect all components to API endpoints
  - Add loading states and error handling
  - _Requirements: 5.1-12.3, 23.1-23.3_

- [ ] 17. POS API Endpoints
  - Create GET /api/pos/medicines endpoint
  - Create GET /api/pos/active-orders endpoint
  - Create POST /api/pos/orders endpoint
  - Create PUT /api/pos/orders/:id endpoint
  - Create POST /api/pos/orders/:id/complete endpoint
  - Implement inventory deduction logic
  - _Requirements: 13.1-15.9_

- [ ] 18. POS - Cart State Management
  - Create POS store with Zustand
  - Implement cart item management (add, remove, update quantity)
  - Implement discount calculation (percentage and amount)
  - Implement payment method selection
  - Calculate subtotal, receivable, received, and due amounts
  - _Requirements: 15.3-15.9_

- [ ] 19. POS - Active Orders Bar
  - Create ActiveOrdersBar component
  - Display patient avatars horizontally
  - Show order type badges (OPD, IPD, OT)
  - Implement order selection with yellow border highlight
  - _Requirements: 14.1-14.3_

- [ ] 20. POS - Patient Info Bar
  - Create PatientInfoBar component with dark background
  - Display patient name, ID, age, phone
  - Show membership status with warning icon if inactive
  - _Requirements: 13.1-13.5_

- [ ] 21. POS - Medicine Card and Grid
  - Create MedicineCard component (120px x 160px)
  - Display medicine image, name, dosage, price, rack, stock badge
  - Implement yellow border for selected state
  - Add "Change" and "Alternative" buttons (visible when selected)
  - Create AddMedicineCard with dashed border and plus icon
  - Create MedicineGrid component for horizontal layout
  - _Requirements: 13.1-13.5_

- [ ] 22. POS - Billing Panel
  - Create BillingPanel component with dark background
  - Display medicine counter badge at top
  - Implement cart items list with +/- quantity controls
  - Add discount input with % and amount toggle
  - Display subtotal, receivable, received, total due
  - Create payment method buttons (CASH, CARD, CODE)
  - Add deposit location dropdown
  - Create large yellow SAVE button
  - Implement disabled state when cart is empty
  - _Requirements: 15.1-15.9_

- [ ] 23. POS Page Integration
  - Create POS page with split-screen layout
  - Integrate ActiveOrdersBar, PatientInfoBar, MedicineGrid, and BillingPanel
  - Connect to POS API endpoints
  - Implement real-time cart calculations
  - Add role-based access (Manager and Pharmacist only)
  - _Requirements: 13.1-15.9_

- [ ] 24. Inventory API Endpoints
  - Create GET /api/inventory/medicines endpoint with search and filters
  - Create GET /api/inventory/stock-alerts endpoint
  - Create GET /api/inventory/expiry endpoint
  - Create POST /api/inventory/medicines endpoint
  - Create PUT /api/inventory/medicines/:id endpoint
  - Create DELETE /api/inventory/medicines/:id endpoint
  - _Requirements: 16.1-18.3_

- [ ] 25. Inventory - Stock List Tab
  - Create StockListTable component
  - Display columns: Medicine name, Batch, Stock count, Rack, Status badge
  - Implement search functionality
  - Add colored status badges
  - Implement role-based action button visibility
  - _Requirements: 16.1-16.4_

- [ ] 26. Inventory - Expiry Management Tab
  - Create ExpiryManagementTable component
  - Display expired medicines section
  - Display expiring soon medicines section with month filters
  - Implement month filter pills
  - Highlight dates (red for expired, orange for soon)
  - _Requirements: 17.1-17.4_

- [ ] 27. Inventory - Stock Alerts Tab
  - Create StockAlertsTable component
  - Display low stock and zero stock sections
  - Show medicine name, current stock level, recommended action
  - _Requirements: 18.1-18.3_

- [ ] 28. Inventory Page Integration
  - Create Inventory page with tab navigation
  - Integrate StockListTable, ExpiryManagementTable, StockAlertsTable
  - Implement tab switching logic
  - Connect to inventory API endpoints
  - Add role-based access control
  - _Requirements: 16.1-18.3_

- [ ] 29. Analytics API Endpoints
  - Create GET /api/analytics/trends endpoint
  - Create GET /api/analytics/waste endpoint
  - Create GET /api/analytics/reports endpoint with date filters
  - Implement data aggregation for charts
  - _Requirements: 19.1-19.4_

- [ ] 30. Analytics Page
  - Create Analytics page layout
  - Implement inventory trends charts (sales trend, stock movement)
  - Implement waste analytics section (expired stock value, overstock indicators)
  - Add reports section with download buttons (UI only)
  - Add date filter controls
  - Implement role-based access (Admin and Manager only)
  - _Requirements: 19.1-19.4_

- [ ] 31. Automation Page (Placeholders)
  - Create Automation page layout
  - Create AI Recommendations section with placeholder cards
  - Create Workflow Automation section with if-then rule cards and toggles
  - Create WhatsApp Integration section with connection status
  - Add disabled test message button
  - Implement role-based access (Admin and Manager only)
  - _Requirements: 20.1-20.4_

- [ ] 32. Settings API Endpoints
  - Create GET /api/settings/profile endpoint
  - Create PUT /api/settings/profile endpoint
  - Create GET /api/settings/mode endpoint
  - Create PUT /api/settings/mode endpoint
  - Create GET /api/settings/roles endpoint (Admin only)
  - _Requirements: 21.1-21.3_

- [ ] 33. Settings Page
  - Create Settings page layout
  - Implement Profile Settings section (Name, Role, Mode)
  - Implement Mode Settings section (OPD/IPD/OT toggles, Critical medicine toggle)
  - Implement Role Management section (Admin only)
  - Connect to settings API endpoints
  - Implement mode switching with UI updates
  - _Requirements: 21.1-21.3, 22.1-22.3_

- [ ] 34. Retail and Hospital Mode Implementation
  - Implement mode detection in frontend
  - Add conditional rendering for OPD/IPD/OT filters based on mode
  - Show/hide profit metrics based on mode
  - Emphasize critical medicines in Hospital mode
  - Update all relevant components to respect mode settings
  - _Requirements: 22.1-22.3_

- [ ] 35. Role-Based Access Control
  - Implement route protection middleware
  - Add role checks to all protected pages
  - Hide/show navigation items based on role
  - Hide/show action buttons based on role
  - Implement read-only mode for Pharmacist on Dashboard and Inventory
  - Test all role-based visibility rules
  - _Requirements: 1.4-1.7_

- [ ] 36. Final Integration and Testing
  - Test all API endpoints with Postman/Thunder Client
  - Test authentication flow (signup, login, token refresh)
  - Test role-based access on all pages
  - Test POS cart calculations and order completion
  - Test inventory filtering and search
  - Verify exact UI match with Figma designs
  - Test responsive behavior
  - Fix any bugs or inconsistencies
  - _Requirements: All_

- [ ] 37. Deployment Preparation
  - Set up environment variables for production
  - Configure database for production
  - Build and test production builds
  - Create deployment documentation
  - _Requirements: All_
