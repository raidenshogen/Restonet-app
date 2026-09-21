# RestoNet - Business Logic & Technical Documentation

## 1. Business Logic Overview

RestoNet is a comprehensive restaurant management system that handles meal reservations, client management, and administrative operations. The system operates on a role-based access control model with distinct workflows for different user types.

## 2. Core Business Rules

### 2.1 Authentication & Authorization

#### Login Process
- **Client Login**: Users authenticate using matricule (employee ID) and intranet password
- **Admin Login**: Administrators use the same credentials but with elevated privileges
- **Token Management**: JWT tokens are used for session management and API authentication
- **Role-based Access**: Users are assigned roles ('Client', 'Admin', 'CREATE', 'ADMIN') that determine their permissions

#### Business Rules:
1. Users must have valid credentials to access the system
2. Admin users can access all system features
3. Client users can only access client-specific features
4. Sessions expire and require re-authentication
5. Failed login attempts are tracked and displayed

### 2.2 Meal Reservation System

#### Core Concepts:
- **Sections**: Organizational units that categorize meals (e.g., Main Course, Dessert)
- **Services**: Time-based meal services (e.g., Breakfast, Lunch, Dinner)
- **Repas (Meals)**: Individual meal items available for reservation
- **Reservations**: Client requests for specific meals on specific dates

#### Business Rules:
1. Clients can only reserve meals within active reservation periods
2. Meals are organized by sections and services
3. Reservations must specify quantity and meal details
4. Reservations have start and end dates for validity
5. Clients can view their reservation history
6. Administrators can manage all reservations

### 2.3 Client Management

#### Account Management:
- **Profile Information**: Clients can view and update their account details
- **Movement History**: Track all reservation activities and changes
- **Suggestions**: Clients can submit feedback and suggestions
- **First Connection**: New users must change their password on first login

#### Business Rules:
1. Clients can only modify their own account information
2. Password changes require current password verification
3. Account activities are logged for audit purposes
4. Clients can view their reservation and payment history

### 2.4 Administrative Functions

#### System Configuration:
- **General Parameters**: System-wide settings and configurations
- **Access Control**: Manage user permissions and roles
- **Interface Configuration**: Customize UI elements and branding
- **Database Management**: Maintain parameter tables and test data

#### Business Rules:
1. Only administrators can modify system parameters
2. Changes to access control require elevated permissions
3. Interface modifications affect all users
4. Database operations are logged and tracked

## 3. Technical Implementation

### 3.1 Frontend Architecture

#### Component Structure:
```
├── Authentication Components
│   ├── login-Client (AuthComponent)
│   ├── login-administrateur (LoginAdministrateurComponent)
│   └── passperdu (PassperduComponent)
├── Admin Components
│   ├── Navigation (NavBarAdminComponent, SideBarAdminComponent)
│   ├── Configuration (ParametresGenerauxAdminComponent)
│   ├── Management (ReservationAdminComponent, ApprovisionnementAdminComponent)
│   └── Utilities (BdTestAdminComponent, TestEnvoiMailAdminComponent)
├── Client Components
│   ├── Navigation (NavBarClientComponent, SidebarClientComponent)
│   ├── Reservations (ReservationRepasClientComponent, DetailRepasClientComponent)
│   ├── Account (InfoCompteComponent, MouvementComponent)
│   └── Features (ApprovisionnerClientComponent, SuggestionComponent)
└── Shared Components
    ├── Guards (AuthAdminGuard, AuthClientGuard)
    ├── Services (AuthService, ReservationService, RepasreservationService)
    └── Models (ClientModel, Reservation, Repasreservation)
```

### 3.2 State Management

#### Authentication State:
- **User Session**: Managed through AuthService
- **Local Storage**: Persistent storage for user data and tokens
- **Role Management**: Dynamic role checking for UI and navigation

#### Application State:
- **Component State**: Local state management within components
- **Service State**: Shared state through injectable services
- **HTTP State**: API response caching and error handling

### 3.3 Data Flow

#### Client Reservation Flow:
1. Client authenticates and receives JWT token
2. Client navigates to reservation page
3. System loads available sections and services
4. Client selects meal and specifies details
5. System validates reservation rules
6. Reservation is created and stored
7. Confirmation is sent to client

#### Admin Management Flow:
1. Admin authenticates with elevated privileges
2. Admin accesses management dashboard
3. System loads administrative data
4. Admin performs management operations
5. Changes are validated and applied
6. System logs all administrative actions

### 3.4 API Integration

#### Backend Communication:
- **Base URL**: `http://localhost:8080/api`
- **Authentication**: Bearer token in Authorization header
- **Request Format**: JSON payloads for all API calls
- **Response Handling**: Standardized error and success responses

#### Key Endpoints:
- `POST /api/auth/login` - User authentication
- `GET /api/getSections` - Retrieve meal sections
- `POST /api/reservations` - Create new reservations
- `GET /api/reservations` - Retrieve reservation data
- `PUT /api/reservations/{id}` - Update existing reservations

## 4. Security Implementation

### 4.1 Authentication Security
- **JWT Tokens**: Secure token-based authentication
- **Token Expiration**: Automatic session timeout
- **Role Validation**: Server-side role verification
- **Password Security**: Secure password handling

### 4.2 Authorization Controls
- **Route Guards**: Protect routes based on user roles
- **Component Guards**: Conditional rendering based on permissions
- **API Security**: Token validation on all API requests
- **CORS Policy**: Controlled cross-origin requests

### 4.3 Data Protection
- **Input Validation**: Client-side and server-side validation
- **XSS Prevention**: Sanitized data handling
- **SQL Injection Protection**: Parameterized queries
- **Data Encryption**: Secure data transmission

## 5. Error Handling Strategy

### 5.1 Client-Side Error Handling
- **Form Validation**: Real-time validation with user feedback
- **HTTP Error Handling**: Graceful handling of API failures
- **Network Errors**: Retry mechanisms and offline detection
- **User Notifications**: Clear error messages and guidance

### 5.2 Server-Side Error Handling
- **Authentication Errors**: Token validation and renewal
- **Authorization Errors**: Role-based access control
- **Business Logic Errors**: Validation and constraint checking
- **System Errors**: Logging and monitoring

## 6. Performance Considerations

### 6.1 Frontend Optimization
- **Lazy Loading**: Components loaded on demand
- **Code Splitting**: Optimized bundle sizes
- **Caching Strategy**: Local storage and HTTP caching
- **Minification**: Production build optimization

### 6.2 Backend Integration
- **API Optimization**: Efficient data retrieval
- **Pagination**: Large dataset handling
- **Caching**: Response caching strategies
- **Connection Pooling**: Database connection management

## 7. Testing Strategy

### 7.1 Unit Testing
- **Component Tests**: Individual component functionality
- **Service Tests**: Business logic validation
- **Model Tests**: Data model validation
- **Guard Tests**: Authorization logic testing

### 7.2 Integration Testing
- **API Integration**: Backend communication testing
- **User Flow Testing**: Complete user journey validation
- **Authentication Testing**: Login/logout flow validation
- **Authorization Testing**: Role-based access validation

## 8. Deployment Configuration

### 8.1 Development Environment
- **Angular CLI**: Development server with hot reload
- **SSL Configuration**: HTTPS development server
- **Proxy Configuration**: Backend API proxy setup
- **Debug Configuration**: Development debugging tools

### 8.2 Production Environment
- **Build Optimization**: Production build configuration
- **SSL Certificates**: Production SSL setup
- **Environment Variables**: Configuration management
- **Monitoring**: Application performance monitoring

## 9. Business Process Workflows

### 9.1 Daily Operations
1. **Morning Setup**: System initialization and health checks
2. **Meal Planning**: Admin configures available meals
3. **Reservation Period**: Clients make meal reservations
4. **Preparation**: Kitchen receives reservation data
5. **Service**: Meal service based on reservations
6. **Reporting**: Daily activity reports generated

### 9.2 Administrative Tasks
1. **User Management**: Add/remove users and assign roles
2. **System Configuration**: Update parameters and settings
3. **Data Maintenance**: Clean up old data and maintain database
4. **Reporting**: Generate usage and performance reports
5. **Backup**: Regular data backup and recovery procedures

## 10. Future Enhancements

### 10.1 Planned Features
- **Real-time Notifications**: Push notifications for reservations
- **Mobile Application**: Native mobile app development
- **Advanced Analytics**: Business intelligence and reporting
- **Integration**: Third-party system integrations

### 10.2 Technical Improvements
- **Progressive Web App**: PWA capabilities
- **Offline Support**: Offline functionality
- **Performance Optimization**: Enhanced loading times
- **Security Enhancements**: Advanced security features

---

This documentation provides a comprehensive understanding of the RestoNet system's business logic, technical implementation, and operational procedures. It serves as a reference for developers, administrators, and stakeholders involved in the system's operation and maintenance.
