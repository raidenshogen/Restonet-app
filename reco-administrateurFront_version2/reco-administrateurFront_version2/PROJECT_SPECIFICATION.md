# RestoNet - Frontend Application Specification

## 1. Project Overview

**RestoNet** is an Angular-based restaurant management system frontend that handles meal reservations, client management, and administrative functions. The application serves two main user types: **Clients** and **Administrators**.

### Technology Stack
- **Framework**: Angular 17
- **Language**: TypeScript
- **Styling**: Bootstrap, Custom CSS
- **Authentication**: JWT Token-based
- **HTTP Client**: Angular HttpClient
- **Backend API**: REST API on `localhost:8080`

## 2. System Architecture

### 2.1 Application Structure
```
src/app/
├── admin/                    # Admin-specific components
├── client/                   # Client-specific components
├── Authentification/         # Authentication components
├── guards/                   # Route guards
├── models/                   # Data models
├── services/                 # Business logic services
├── shared/                   # Shared components
└── assets/                   # Static assets
```

### 2.2 User Roles
- **Client**: Can make reservations, view meals, manage account
- **Admin**: Can manage system parameters, reservations, provisioning
- **Gestionnaire**: Manager role (guard exists but not fully implemented)

## 3. Core Features

### 3.1 Authentication System
- **Login Pages**: Separate login for clients and administrators
- **JWT Token Management**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for different user types
- **Password Recovery**: Password reset functionality

### 3.2 Client Features
- **Meal Reservation**: Browse and reserve meals by sections and services
- **Account Management**: View and edit account information
- **Movement History**: Track reservation history and transactions
- **Suggestions**: Submit feedback and suggestions
- **Meal Provisioning**: View available meals and make selections

### 3.3 Admin Features
- **System Parameters**: Configure general system settings
- **Access Control**: Manage user access and permissions
- **Interface Configuration**: Customize UI elements
- **Reservation Management**: View and manage all reservations
- **Provisioning Management**: Manage meal provisioning
- **Database Management**: Parameter and test database operations
- **Email Testing**: Test email sending functionality

## 4. Data Models

### 4.1 Core Models

#### ClientModel
```typescript
export class ClientModel {
  matricule?: string;           // User identifier
  motdepasseintranet?: string;  // Password
  roles?: string[];             // User roles ['Client', 'Admin', 'CREATE', 'ADMIN']
}
```

#### Repasreservation (Meal Reservation)
```typescript
export class Repasreservation {
  repasareservation?: number;    // Meal reservation ID
  daterepas?: Date;              // Meal date
  designation?: string;          // Meal description
  repasmodele?: number;          // Meal model ID
  datedebutreservation!: Date;   // Reservation start date
  datefinreservation!: Date;     // Reservation end date
  codeservice!: string;          // Service code
  section?: string;              // Section identifier
}
```

#### Reservation
```typescript
export class Reservation {
  numeroReservation?: number;    // Reservation number
  repasReservation?: number;     // Meal reservation reference
  client?: string;               // Client identifier
  nom?: string;                  // Client name
  societe?: string;              // Company
  unite?: string;                // Unit/Department
  categorieClient?: string;      // Client category
  modeSaisie?: string;           // Input mode
  operateur?: string;            // Operator
  dateSaisie?: Date;             // Entry date
  heureSaisie?: string;          // Entry time
  modeValidation?: string;       // Validation mode
  etatReservation?: string;      // Reservation status
  nombreRepas?: number;          // Number of meals
  numeroPlateau?: number;        // Tray number
  facture?: string;              // Invoice reference
  codeService?: string;          // Service code
}
```

#### SectionModel
```typescript
export class SectionModel {
  section?: string;              // Section code
  designation?: string;          // Section name
  gestionreservations?: string;  // Reservation management flag
  codeservice?: string;          // Service code
}
```

## 5. Service Layer

### 5.1 Authentication Service
- **SignIn()**: User authentication
- **isAdmin()**: Check admin privileges
- **isCreate()**: Check creation privileges  
- **logout()**: User logout
- **Token Management**: JWT token handling

### 5.2 Reservation Service
- **createReservation()**: Create new reservations
- **HTTP Integration**: API calls to backend
- **Error Handling**: Proper error management

### 5.3 Repasreservation Service
- **getAllSection()**: Retrieve all sections
- **getSectionById()**: Get specific section
- **API Integration**: Backend communication

## 6. Routing & Navigation

### 6.1 Route Structure
```typescript
const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'loginadmin', component: LoginAdministrateurComponent },
  { path: 'passwordperdu', component: PassperduComponent },
  { path: 'changepassword', component: FirstCnxComponent },
  
  // Admin Routes
  { path: 'admin', component: SideBarAdminComponent, children: [...] },
  
  // Client Routes  
  { path: 'client', component: SidebarClientComponent, children: [...] }
];
```

### 6.2 Route Guards
- **authAdminGuard**: Protects admin routes
- **authClientGuard**: Protects client routes
- **Redirect Logic**: Unauthorized access handling

## 7. Security Features

### 7.1 Authentication
- JWT token-based authentication
- Role-based access control
- Session management
- Secure logout

### 7.2 API Security
- HTTPS backend communication
- Token validation
- CORS configuration
- SSL certificate handling

## 8. UI/UX Features

### 8.1 Responsive Design
- Bootstrap integration
- Mobile-friendly interface
- Adaptive layouts

### 8.2 User Experience
- Intuitive navigation
- Clear error messages
- Loading states
- Form validation

## 9. Backend Integration

### 9.1 API Configuration
- **Base URL**: `http://localhost:8080/api`
- **Proxy Configuration**: `proxy.conf.json`
- **HTTPS Backend**: `https://localhost:8443`

### 9.2 HTTP Interceptors
- Token injection
- Error handling
- Response transformation

## 10. Development & Build

### 10.1 Development Server
- **Port**: 9090
- **SSL**: Enabled with certificates
- **Hot Reload**: Development mode

### 10.2 Build Process
- **Production Build**: Optimized bundle
- **Development Build**: Debug-friendly
- **Testing**: Unit and integration tests

## 11. Error Handling

### 11.1 Authentication Errors
- Invalid credentials
- Token expiration
- Access denied

### 11.2 API Errors
- Network failures
- Server errors
- Validation errors

## 12. Future Enhancements

### 12.1 Planned Features
- Real-time notifications
- Advanced reporting
- Mobile app integration
- Multi-language support

### 12.2 Technical Improvements
- Progressive Web App (PWA)
- Performance optimization
- Enhanced security
- Better error tracking

---

This specification provides a comprehensive overview of the RestoNet frontend application, covering all major components, features, and architectural decisions. The system is designed to be scalable, maintainable, and user-friendly while ensuring proper security and performance.
