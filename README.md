# 🩸 LifeLink – Blood Bank Management System

LifeLink is a full-stack Blood Bank Management System developed to make blood donor management simple, organized and efficient.

The application allows users to find blood donors, register as donors and manage donor information through a user-friendly web interface.

## 🌐 Live Demo

- Frontend: https://lifelink-blood-bank-management-system.onrender.com
- Backend API: https://lifelink-backend-qb67.onrender.com
- Swagger API Documentation: https://lifelink-backend-qb67.onrender.com/swagger-ui/index.html

## ✨ Features

- 🔐 User Registration and Login
- 🔑 JWT-based Authentication
- 👤 Role-based Authorization
- 🩸 Blood Donor Management
- ➕ Add Donor
- ✏️ Edit Donor
- 🗑️ Delete Donor
- 🔎 Search donors by name, city or phone
- 🩸 Filter donors by blood group
- 🟢 Filter donors by availability
- 📊 Dashboard with donor statistics
- 👨‍💼 Admin/User roles
- 📱 Responsive user interface
- 🔒 Protected routes
- 🌐 REST API integration
- 📝 Donation Request Management
- ✅ Approve/Reject Donation Requests
- 🎫 Donation Token Generation

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Axios
- React Icons
- Bootstrap
- Vite

### Backend

- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- Hibernate
- Maven
- REST API

### Database

- MySQL
- Aiven Cloud MySQL

### Deployment

- GitHub
- Render
- Aiven

## 🏗️ Project Architecture

```text
LifeLink
│
├── bloodbank-backend
│   ├── src
│   ├── pom.xml
│   ├── Dockerfile
│   └── mvnw
│
├── bloodbank-frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── utils
│   │   └── assets
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## 🔐 Authentication & Authorization

LifeLink uses JWT-based authentication with Spring Security.

### USER

Users can:

- Register and login
- View donors
- Search and filter donors
- View donor details
- Create donation requests
- View their own donation request

### ADMIN

Admins can:

- Add donors
- Edit donors
- Delete donors
- View all donation requests
- Approve donation requests
- Reject donation requests
- Delete donation requests
- Manage the blood bank system

## 🩸 Donation Request Flow

```text
User
  │
  ▼
Create Donation Request
  │
  ▼
PENDING
  │
  ├───────────────┐
  ▼               ▼
APPROVED        REJECTED
  │
  ▼
Donor Created
```

## 📊 Dashboard

The dashboard provides:

- Total Donors
- Available Donors
- Blood Groups
- Unavailable Donors
- Blood Group Availability
- Recent Donors
- Donation Requests
- Quick Actions

## 🔒 Security

The application implements:

- JWT Authentication
- BCrypt Password Encryption
- Spring Security
- Role-based Authorization
- Protected REST APIs
- Protected Frontend Routes
- CORS Configuration
- Admin-only donor modification
- Admin-only donation request management
- User-specific donation request access
- Environment files excluded using `.gitignore`

## 📋 Role Permissions

| Feature | USER | ADMIN |
|---|:---:|:---:|
| Register/Login | ✅ | ✅ |
| View Donors | ✅ | ✅ |
| Search/Filter Donors | ✅ | ✅ |
| View Donor Details | ✅ | ✅ |
| Add Donor | ❌ | ✅ |
| Edit Donor | ❌ | ✅ |
| Delete Donor | ❌ | ✅ |
| Create Donation Request | ✅ | ✅ |
| View Own Request | ✅ | ✅ |
| View All Requests | ❌ | ✅ |
| Approve/Reject Request | ❌ | ✅ |
| Delete Request | ❌ | ✅ |

## ⚙️ Local Setup

### Backend

```bash
cd bloodbank-backend
mvn clean package
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### Frontend

Open another terminal:

```bash
cd bloodbank-frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 🗄️ Database

The application uses MySQL with Spring Data JPA and Hibernate.

Production database is hosted using Aiven Cloud MySQL.

Do not commit:

- Database passwords
- JWT secrets
- API keys
- `.env` files
- Production credentials

## 🔌 REST API

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Donors

```text
GET    /api/donors
GET    /api/donors/{id}
POST   /api/donors
PUT    /api/donors/{id}
DELETE /api/donors/{id}
```

### Donation Requests

```text
POST   /api/donation-requests
GET    /api/donation-requests
GET    /api/donation-requests/my
GET    /api/donation-requests/{id}
PUT    /api/donation-requests/{id}/status
DELETE /api/donation-requests/{id}
```

### Available Slots

```text
GET /api/donation-requests/available-slots
```

## 🧪 API Testing

The APIs can be tested using:

- Swagger UI
- Postman
- Browser Developer Tools
- LifeLink Frontend

Swagger:

https://lifelink-backend-qb67.onrender.com/swagger-ui/index.html

## 🌐 Deployment

```text
                    GitHub
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
      Frontend                   Backend
       Render                    Render
                                    │
                                    ▼
                              Aiven MySQL
```

## 🚀 Future Enhancements

- Email notifications
- SMS notifications
- Blood donation history
- Blood inventory management
- Hospital management
- Emergency blood requests
- Advanced analytics
- Appointment reminders
- Password reset
- Profile management
- Automated testing
- CI/CD pipeline

## 🎯 Project Highlights

This project demonstrates practical experience with:

- Full-stack development
- React.js
- Spring Boot
- Spring Security
- JWT Authentication
- Role-based Authorization
- REST APIs
- CRUD Operations
- MySQL
- JPA/Hibernate
- DTO Architecture
- ModelMapper
- Global Exception Handling
- Input Validation
- Cloud Deployment
- Git & GitHub
- Responsive UI

## 👨‍💻 Author

### Krishnam Soni

Full Stack Developer | Java | Spring Boot | React.js

GitHub:

https://github.com/krishnam123soni/LifeLink-Blood-Bank-Management-System

---

⭐ If you find this project useful, consider giving the repository a star.

**Built with ❤️ using React.js, Spring Boot and MySQL.**