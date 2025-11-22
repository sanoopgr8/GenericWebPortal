# Project Architecture

```mermaid
graph TD
    subgraph Client ["Client Side"]
        Browser[Web Browser]
    end

    subgraph Infrastructure ["Infrastructure"]
        Nginx[Nginx Reverse Proxy]
    end

    subgraph Frontend ["Frontend (React + Vite)"]
        UI[User Interface]
        Router[React Router]
        LoginComp[Login Component]
        SignupComp[Signup Component]
        
        Browser -- "HTTPS (Port 443)" --> Nginx
        Nginx -- "Serve Static Files" --> UI
        UI --> Router
        Router --> LoginComp
        Router --> SignupComp
    end

    subgraph Backend ["Backend (Spring Boot)"]
        Controller[REST Controllers]
        AuthCtrl[AuthController]
        HelloCtrl[HelloController]
        Service[Service Layer]
        EmailSvc[EmailService]
        Repo[UserRepository]
        
        Nginx -- "Proxy /api/* (HTTP Port 8080)" --> Controller
        
        LoginComp -- "POST /api/login" --> Nginx
        SignupComp -- "POST /api/signup" --> Nginx
        UI -- "GET /api/hello" --> Nginx
        
        Controller --> AuthCtrl
        Controller --> HelloCtrl
        AuthCtrl --> Service
        Service --> Repo
        Service --> EmailSvc
    end

    subgraph External ["External Services"]
        SMTP[SMTP Server]
        EmailSvc -- "SMTP (TLS)" --> SMTP
    end

    subgraph Database ["Data Storage"]
        PostgreSQL[(PostgreSQL Database)]
        
        Repo -- "JDBC/Hibernate" --> PostgreSQL
    end

    %% Styling
    style Client fill:#f9f,stroke:#333,stroke-width:2px
    style Infrastructure fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
    style Frontend fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style Backend fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style Database fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style External fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
```

## Description

1.  **Client**: The user interacts with the application via a web browser.
2.  **Infrastructure**:
    *   **Nginx**: Acts as a reverse proxy and SSL terminator. It serves the frontend static files and proxies API requests to the backend. It runs on port 443 (HTTPS).
3.  **Frontend**: Built with React and Vite.
    *   **React Router**: Handles navigation between the Login and Signup pages.
    *   **Components**: `Login`, `Signup`, and `Home` interact with the user and make API calls.
4.  **Backend**: Built with Java Spring Boot.
    *   **Controllers**: Expose REST endpoints (`/api/login`, `/api/signup`, `/api/hello`).
    *   **Services**: Business logic, including user authentication and email sending.
    *   **JPA/Hibernate**: Manages object-relational mapping.
5.  **External Services**:
    *   **SMTP Server**: Used for sending verification emails during signup.
6.  **Database**: PostgreSQL database (`webportal`) stores user data persistently.
