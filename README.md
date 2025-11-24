# Web Portal

A modern web application with React frontend and Spring Boot backend, featuring user authentication with email verification.

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 12+
- Maven 3.6+

### Backend Setup
```bash
cd web-portal/backend
./mvnw clean install
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd web-portal/frontend
npm install
npm run dev
```

### Database Setup

#### Automated Setup (Windows)
Double-click `web-portal/setup.bat` in the root directory, or run:
```cmd
web-portal\setup.bat
```


#### Manual Setup
1. Install PostgreSQL 12+
2. Create PostgreSQL database: `webportal`
3. Update credentials in `web-portal/backend/src/main/resources/application.properties` if you changed the default password
4. Liquibase will automatically create tables on first run

## 📚 Documentation

- **[Architecture](web-portal/docs/architecture/architecture.md)** - System architecture and design
- **[Setup Guides](web-portal/docs/setup/)** - Installation and configuration guides
- **[Features](web-portal/docs/features/SIGNUP_IMPLEMENTATION.md)** - Feature documentation
- **[SonarQube Integration](web-portal/docs/SONARQUBE.md)** - Code quality and analysis setup


## 🏗️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.5.7
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA
- **Migrations**: Liquibase
- **Email**: Spring Mail (SMTP)

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Routing**: React Router 7
- **Styling**: Vanilla CSS

## ✨ Features

- ✅ User Registration with Email Verification
- ✅ Login/Logout
- ✅ Password Validation
- ✅ Email Verification System
- ✅ PostgreSQL Database
- ✅ Liquibase Database Migrations
- ✅ CORS Configuration
- ✅ Responsive UI

## 🔐 Security Features

- Email verification required before login
- Password strength validation (8+ chars, uppercase, lowercase, number, special char)
- CORS protection
- Input validation (client and server-side)

## 📁 Project Structure

```
web-portal/
├── backend/              # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── frontend/             # React frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Verify.jsx
│   └── package.json
└── docs/                 # Documentation
    ├── architecture/
    ├── setup/
    └── features/
```

## 🌐 Endpoints

### Backend (Port 8081)
- `POST /api/signup` - User registration
- `GET /api/verify?token=...` - Email verification
- `POST /api/login` - User login
- `GET /api/hello` - Test endpoint

### Frontend (Port 5173)
- `/` - Login page
- `/signup` - Registration page
- `/verify` - Email verification page

## 🛠️ Development

### Running Tests
```bash
# Backend
cd web-portal/backend
./mvnw test

# Frontend
cd web-portal/frontend
npm test
```

### Building for Production
```bash
# Backend
cd web-portal/backend
./mvnw clean package

# Frontend
cd web-portal/frontend
npm run build
```

## 📝 Configuration

Key configuration files:
- `web-portal/backend/src/main/resources/application.properties` - Backend configuration
- `web-portal/frontend/vite.config.js` - Frontend build configuration
- `web-portal/backend/src/main/resources/db/changelog/` - Database migrations

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests if applicable
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Sanoop

## 🔗 Related Documentation

- [Liquibase Guide](web-portal/docs/setup/LIQUIBASE_GUIDE.md)
- [Signup Implementation](web-portal/docs/features/SIGNUP_IMPLEMENTATION.md)
- [Architecture Diagram](web-portal/docs/architecture/architecture.md)
- [SonarQube Integration](web-portal/docs/SONARQUBE.md)

