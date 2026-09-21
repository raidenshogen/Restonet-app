# RestoNet - UML Diagrams

## Class Diagram

```mermaid
classDiagram
    %% Core Models
    class ClientModel {
        +string matricule
        +string motdepasseintranet
        +string[] roles
    }
    
    class Repasreservation {
        +number repasareservation
        +Date daterepas
        +string designation
        +number repasmodele
        +Date datedebutreservation
        +Date datefinreservation
        +string codeservice
        +string section
    }
    
    class Reservation {
        +number numeroReservation
        +number repasReservation
        +string client
        +string nom
        +string societe
        +string unite
        +string categorieClient
        +string modeSaisie
        +string operateur
        +Date dateSaisie
        +string heureSaisie
        +string modeValidation
        +string etatReservation
        +number nombreRepas
        +number numeroPlateau
        +string facture
        +string codeService
    }
    
    class SectionModel {
        +string section
        +string designation
        +string gestionreservations
        +string codeservice
    }
    
    class DetailReservation {
        +number numeroReservation
        +string codeArticle
        +number quantite
    }
    
    class ArticleModel {
        +string article
        +string designation
        +number prix
    }
    
    %% Services
    class AuthService {
        +ClientModel[] users
        +string loggedUser
        +boolean isloggedIn
        +string[] roles
        +Router router
        +SignIn(ClientModel user) boolean
        +isAdmin() boolean
        +isCreate() boolean
        +logout() void
        +setLoggedUserLS(string login) void
        +getRoles(string login) void
    }
    
    class ReservationService {
        -string apiUrl
        -HttpClient http
        +createReservation(Reservation reservation, any[] details) Observable~Reservation~
        +getReservations() Observable~Reservation[]~
        +updateReservation(Reservation reservation) Observable~Reservation~
        +deleteReservation(number id) Observable~void~
    }
    
    class RepasreservationService {
        -string host
        +Repasreservation[] repas
        +SectionModel[] sections
        -HttpClient http
        +getAllSection() Observable~SectionModel[]~
        +getSectionById(string section) Observable~SectionModel~
        +getRepasById(number id) Observable~Repasreservation~
        +getAllRepas() Observable~Repasreservation[]~
    }
    
    class ClientService {
        -string apiUrl
        -HttpClient http
        +getClient(string matricule) Observable~ClientModel~
        +updateClient(ClientModel client) Observable~ClientModel~
        +getClientMovements(string matricule) Observable~any[]~
    }
    
    %% Components
    class AuthComponent {
        +FormControl clientControl
        +FormControl passwordControl
        +TexteAccueilService textService
        +Router router
        +HttpClient http
        +onSubmit() void
        +ngOnInit() void
    }
    
    class LoginAdministrateurComponent {
        +number error
        +ClientModel user
        +AuthService authService
        +Router router
        +onLoggedin() void
        +ngOnInit() void
    }
    
    class ReservationRepasClientComponent {
        +string selectedSection
        +string selectedService
        +Repasreservation[] repas
        +SectionModel[] sections
        +Repasreservation[] filteredRepas
        +RepasreservationService repasreservationService
        +Router router
        +ngOnInit() void
        +filterRepas() void
        +selectRepas(Repasreservation repas) void
    }
    
    class SideBarAdminComponent {
        +AuthService authService
        +Router router
        +ngOnInit() void
        +logout() void
    }
    
    class SidebarClientComponent {
        +AuthService authService
        +Router router
        +ngOnInit() void
        +logout() void
    }
    
    %% Guards
    class AuthAdminGuard {
        +canActivate(route, state) boolean
    }
    
    class AuthClientGuard {
        +canActivate(route, state) boolean
    }
    
    %% Relationships
    ClientModel ||--o{ Reservation : "makes"
    Reservation ||--o{ DetailReservation : "contains"
    Reservation }o--|| Repasreservation : "references"
    SectionModel ||--o{ Repasreservation : "categorizes"
    ArticleModel ||--o{ DetailReservation : "details"
    
    AuthService --> ClientModel : "manages"
    ReservationService --> Reservation : "handles"
    RepasreservationService --> Repasreservation : "manages"
    RepasreservationService --> SectionModel : "retrieves"
    ClientService --> ClientModel : "manages"
    
    AuthComponent --> AuthService : "uses"
    LoginAdministrateurComponent --> AuthService : "uses"
    ReservationRepasClientComponent --> RepasreservationService : "uses"
    SideBarAdminComponent --> AuthService : "uses"
    SidebarClientComponent --> AuthService : "uses"
    
    AuthAdminGuard --> AuthService : "checks"
    AuthClientGuard --> AuthService : "checks"
```

## Sequence Diagrams

### 1. Client Login Process

```mermaid
sequenceDiagram
    participant C as Client
    participant AC as AuthComponent
    participant AS as AuthService
    participant HC as HttpClient
    participant API as Backend API
    participant R as Router
    
    C->>AC: Enter credentials
    AC->>AC: Form validation
    AC->>HC: POST /api/auth/login
    HC->>API: Authentication request
    API-->>HC: JWT Token + User info
    HC-->>AC: Response
    AC->>AS: Store token & user info
    AS->>AS: Set user session
    AS-->>AC: Success confirmation
    AC->>R: Navigate to client dashboard
    R-->>C: Redirect to /client/ApprovisionnerClientComponent
```

### 2. Admin Login Process

```mermaid
sequenceDiagram
    participant A as Admin
    participant LAC as LoginAdministrateurComponent
    participant AS as AuthService
    participant R as Router
    
    A->>LAC: Enter admin credentials
    LAC->>AS: SignIn(user)
    AS->>AS: Validate credentials
    AS->>AS: Set logged user & roles
    AS-->>LAC: Return validation result
    alt Valid credentials
        LAC->>R: Navigate to admin panel
        R-->>A: Redirect to /admin/ParametresGenerauxAdminComponent
    else Invalid credentials
        LAC->>LAC: Set error flag
        LAC-->>A: Display error message
    end
```

### 3. Meal Reservation Process

```mermaid
sequenceDiagram
    participant C as Client
    participant RRC as ReservationRepasClientComponent
    participant RRS as RepasreservationService
    participant RS as ReservationService
    participant HC as HttpClient
    participant API as Backend API
    
    C->>RRC: Access reservation page
    RRC->>RRS: getAllSection()
    RRS->>HC: GET /api/getSections
    HC->>API: Request sections
    API-->>HC: Return sections
    HC-->>RRS: Sections data
    RRS-->>RRC: Section list
    RRC-->>C: Display sections
    
    C->>RRC: Select section
    RRC->>RRS: getRepasById(sectionId)
    RRS->>HC: GET /api/repas
    HC->>API: Request meals
    API-->>HC: Return meals
    HC-->>RRS: Meals data
    RRS-->>RRC: Filtered meals
    RRC-->>C: Display available meals
    
    C->>RRC: Select meal and quantity
    RRC->>RS: createReservation(reservation, details)
    RS->>HC: POST /api/reservations
    HC->>API: Create reservation
    API-->>HC: Reservation created
    HC-->>RS: Success response
    RS-->>RRC: Confirmation
    RRC-->>C: Display success message
```

### 4. Route Guard Authentication

```mermaid
sequenceDiagram
    participant U as User
    participant R as Router
    participant AG as AuthAdminGuard
    participant AS as AuthService
    participant C as Component
    
    U->>R: Navigate to protected route
    R->>AG: canActivate()
    AG->>AS: isAdmin()
    AS->>AS: Check user roles
    AS-->>AG: Return admin status
    
    alt User is admin
        AG-->>R: Return true
        R->>C: Load component
        C-->>U: Display admin page
    else User is not admin
        AG->>R: Navigate to error page
        R-->>U: Redirect to PageNotfndAdminComponent
    end
```

### 5. Logout Process

```mermaid
sequenceDiagram
    participant U as User
    participant SC as SidebarComponent
    participant AS as AuthService
    participant LS as LocalStorage
    participant R as Router
    
    U->>SC: Click logout
    SC->>AS: logout()
    AS->>AS: Clear user session
    AS->>LS: Remove user data
    AS->>LS: Remove tokens
    AS->>R: Navigate to login
    R-->>U: Redirect to /login
```

### 6. API Request with JWT Token

```mermaid
sequenceDiagram
    participant C as Component
    participant S as Service
    participant HC as HttpClient
    participant LS as LocalStorage
    participant API as Backend API
    
    C->>S: Request data
    S->>LS: Get JWT token
    LS-->>S: Return token
    S->>HC: HTTP request with Bearer token
    HC->>API: API call with Authorization header
    
    alt Valid token
        API-->>HC: Return data
        HC-->>S: Success response
        S-->>C: Return data
    else Invalid/expired token
        API-->>HC: 401 Unauthorized
        HC-->>S: Error response
        S->>S: Handle token expiration
        S-->>C: Redirect to login
    end
```

## Component Interaction Diagram

```mermaid
graph TB
    %% Authentication Layer
    AC[AuthComponent] --> AS[AuthService]
    LAC[LoginAdministrateurComponent] --> AS
    
    %% Admin Layer
    SBA[SideBarAdminComponent] --> AS
    PGA[ParametresGenerauxAdminComponent] --> AS
    RA[ReservationAdminComponent] --> RS[ReservationService]
    AA[ApprovisionnementAdminComponent] --> RRS[RepasreservationService]
    
    %% Client Layer
    SBC[SidebarClientComponent] --> AS
    RRC[ReservationRepasClientComponent] --> RRS
    DRC[DetailRepasClientComponent] --> RRS
    IC[InfoCompteComponent] --> CS[ClientService]
    MC[MouvementComponent] --> CS
    
    %% Services Layer
    RS --> HC[HttpClient]
    RRS --> HC
    CS --> HC
    AS --> R[Router]
    
    %% Guards Layer
    AAG[AuthAdminGuard] --> AS
    ACG[AuthClientGuard] --> AS
    
    %% Backend Communication
    HC --> API[Backend API]
    
    %% Storage
    AS --> LS[LocalStorage]
    
    %% Routing
    R --> AC
    R --> LAC
    R --> SBA
    R --> SBC
```

---

These diagrams provide a comprehensive view of the RestoNet application's architecture, showing the relationships between classes, the flow of user interactions, and the system's behavior during key operations.
