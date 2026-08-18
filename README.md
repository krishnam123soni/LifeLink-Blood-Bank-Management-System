# 🩸 LifeLink – Blood Bank Management System

LifeLink is a full-stack Blood Bank Management System developed to make blood donor management simple, organized and efficient.

The application allows users to find blood donors, register as donors and manage donor information through a user-friendly web interface.

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

## 🛠️ Technologies Used

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Axios
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

## 🏗️ Project Architecture

```text
LifeLink
│
├── bloodbank-backend
│   ├── src
│   │   └── main
│   │       ├── java
│   │       └── resources
│   ├── pom.xml
│   └── mvnw
│
└── bloodbank-frontend
    ├── public
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── services
    │   └── assets
    ├── package.json
    └── vite.config.js
