# Web Portal

A modern, full-stack web application featuring user authentication, email verification, and configurable mail server settings. Built with Spring Boot backend and React frontend, designed with a premium glassmorphic UI and deployed with Nginx reverse proxy.

## 🌟 Features

### Authentication & User Management
- **Secure User Registration** with email verification
- **Login System** with session management
- **Email Verification** flow for new user accounts
- Password validation and secure storage

### Mail Server Configuration
- **Dynamic Mail Settings** - Configure SMTP settings through the UI
- **Settings Page** - Admin interface for mail server configuration
- Support for various mail protocols (SMTP, SMTPS)
- Configurable authentication and STARTTLS options

### Modern UI/UX
- **Glassmorphic Design** with smooth animations and transitions
- **Dark Mode Support** with automatic theme detection
- **Responsive Layout** optimized for all screen sizes
- **Sidebar Navigation** with intuitive icon-based menu
- Premium visual aesthetics with gradient accents

## 🛠️ Tech Stack

### Backend
- **Spring Boot 3.5.7** - Java 17
- **PostgreSQL** - Database
- **Liquibase** - Database migration management
- **Spring Data JPA** - ORM
- **Spring Mail** - Email functionality
- **Maven** - Build tool

### Frontend
- **React 19.2** - UI framework
- **Vite 7.2** - Build tool and dev server
- **React Router 7.9** - Client-side routing
- **Vanilla CSS** - Custom styling with CSS variables

### Infrastructure
- **Nginx** - Reverse proxy and SSL termination
- **PostgreSQL** - Persistent data storage

## 📋 Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **PostgreSQL 12** or higher
- **Maven 3.6** or higher
- **Nginx** (for production deployment)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd web-portal
```

### 2. Database Setup
```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE webportal;
\q
```

### 3. Environment Configuration
Create a `.env` file in the root directory (use `.env.example` as template):
```env
DATABASE_URL=jdbc:postgresql://localhost:5432/webportal
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password

MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=noreply@example.com
MAIL_PASSWORD=your_mail_password

APP_BASE_URL=https://localhost
```

### 4. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
The backend will start on `http://localhost:8080`

### 5. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`

### 6. Nginx Configuration (Optional - Production)
```bash
# Copy nginx.conf to your nginx configuration directory
sudo cp nginx.conf /etc/nginx/sites-available/webportal
sudo ln -s /etc/nginx/sites-available/webportal /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 📁 Project Structure

```
web-portal/
├── backend/                 # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/demo/
│   │   │   │       ├── AuthController.java
│   │   │   │       ├── EmailService.java
│   │   │   │       ├── MailConfig.java
│   │   │   │       ├── MailConfigRepository.java
│   │   │   │       ├── SettingsController.java
│   │   │   │       └── User.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/changelog/
│   │   └── test/
│   └── pom.xml
├── frontend/               # React application
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Settings.jsx
│   │   ├── Verify.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── docs/                   # Documentation
├── scripts/                # Utility scripts
├── nginx.conf             # Nginx configuration
├── .env.example           # Environment variables template
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /api/login` - User login
- `GET /api/verify` - Email verification

### Settings
- `GET /api/settings/mail` - Get mail configuration
- `POST /api/settings/mail` - Update mail configuration

### General
- `GET /api/hello` - Health check endpoint

## 🎨 Features in Detail

### Email Verification System
New users receive a verification email with a unique token. The email includes a link to verify their account, ensuring valid email addresses and preventing spam registrations.

### Dynamic Mail Configuration
Administrators can configure mail server settings through the Settings page without restarting the application. Settings are stored in the database and applied dynamically.

### Database Migrations
Liquibase manages all database schema changes, ensuring consistent database state across environments and easy rollback capabilities.

## 🔒 Security Features

- Password hashing and secure storage
- Email verification for new accounts
- Environment-based configuration
- CORS protection
- SQL injection prevention via JPA
- Secure session management

## 📊 Code Quality

This project uses **SonarQube** for continuous code quality and security analysis.

### Static Code Analysis
- Automated analysis on every push and pull request
- Detects bugs, vulnerabilities, and code smells
- Tracks code coverage and technical debt
- Enforces quality gates for maintainability

### Setup SonarQube
For detailed instructions on setting up and using SonarQube analysis, see [SonarQube Documentation](docs/SONARQUBE.md).

**Quick Setup:**
1. Configure `SONAR_TOKEN` and `SONAR_HOST_URL` in GitHub Secrets
2. Push to `main` or create a pull request
3. View results in your SonarQube dashboard


## 🌐 Deployment

The application is designed to be deployed behind an Nginx reverse proxy, which handles:
- SSL/TLS termination
- Static file serving
- API request proxying
- CORS management
- Load balancing (if needed)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue in the GitHub repository.

---

**Built with ❤️ using Spring Boot and React**
