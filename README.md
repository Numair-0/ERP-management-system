🕌 Madarsa Management Suite

A professional, multilingual-ready enterprise management dashboard built specifically for Islamic educational institutions and boarding madarsas.
🚀 Overview
The Madarsa Management Suite is a comprehensive, modular ERP designed to digitize and streamline administrative, academic, and residential operations for Islamic educational institutions. It features a robust, secure Node.js backend coupled with a modern Vite + React progressive web application shell.

Key Highlights
Modular ERP Architecture: Scalable domain modules covering academics, attendance, accounting, library, kitchen, hostel, and administration.

Enterprise Security: Built with bcrypt, JWT authentication, persistent device sessions, granular Role-Based Access Control (RBAC), and full audit logging.

Developer Experience: Clean separation of concerns following a strict route -> controller -> service -> repository pattern.

Production Ready: Pre-configured with database seeding for initial administrative accounts and sample test datasets.


🛠️ Technology StackLayerTechnologies
FrontendVite, React, 
Progressive Web App (PWA) ShellBackendNode.js, Express.js 
DatabaseMongoDB, Mongoose 
ODMSecurityJSON Web Tokens (JWT),
bcrypt, RBAC

├── frontend/                  # Vite + React interface and presentation components
└── backend/                   # Express API, routes, and domain data
    └── src/
        ├── config/            # Environment and application configuration
        ├── controllers/       # HTTP request and response handlers
        ├── data/              # Seed data for initial database initialization
        ├── database/          # MongoDB connection and seed initialization
        ├── middleware/        # Error, authentication, and not-found handling
        ├── repositories/      # Data access boundary (Database abstraction)
        ├── routes/            # API endpoint definitions
        ├── services/          # Business logic and use cases
        ├── app.js             # Express middleware and route composition
        └── server.js          # Process startup and HTTP listener

