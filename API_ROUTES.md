# 📡 Markaz Management System - API Routes

## Base URL
```
http://localhost:4000/api
```

---

## 🔐 Authentication Routes
### POST `/auth/login`
Login with email and password
```json
Request:
{
  "email": "admin@markaz.local",
  "password": "Admin@123"
}

Response:
{
  "user": {
    "id": "user_id",
    "name": "Admin Staff",
    "email": "admin@markaz.local",
    "role": "super_admin"
  },
  "token": "jwt_token_here"
}
```

### GET `/auth/me`
Get current user info
```
Headers: Authorization: Bearer {token}
```

---

## 🖥️ System Status Routes
### GET `/system/status`
Check system health and status
```json
Response:
{
  "status": "ok",
  "service": "madarsa-management-api",
  "timestamp": "2026-08-31T10:30:00.000Z"
}
```

---

## 📊 Dashboard Routes
### GET `/madarsa/dashboard`
Get dashboard overview and statistics
```
Headers: Authorization: Bearer {token}
```

---

## 🏫 Madarsa Modules Routes

### List All Modules
**GET** `/madarsa`
Get all available madarsa modules

### Module-Specific Operations

#### **Students Module**
- `GET /madarsa/students` - List all students
- `POST /madarsa/students/records` - Create student record
- `GET /madarsa/students/records/{recordId}` - Get student details
- `PATCH /madarsa/students/records/{recordId}` - Update student
- `DELETE /madarsa/students/records/{recordId}` - Delete student

#### **Academics Module**
- `GET /madarsa/academics` - List courses
- `POST /madarsa/academics/records` - Create course
- `GET /madarsa/academics/records/{recordId}` - Get course details
- `PATCH /madarsa/academics/records/{recordId}` - Update course
- `DELETE /madarsa/academics/records/{recordId}` - Delete course

#### **Attendance Module**
- `GET /madarsa/attendance` - View attendance records
- `POST /madarsa/attendance/records` - Create attendance record
- `GET /madarsa/attendance/records/{recordId}` - Get attendance details
- `PATCH /madarsa/attendance/records/{recordId}` - Update attendance
- `DELETE /madarsa/attendance/records/{recordId}` - Delete attendance

#### **Accounting Module**
- `GET /madarsa/accounting` - View financial records
- `POST /madarsa/accounting/records` - Create voucher/transaction
- `GET /madarsa/accounting/records/{recordId}` - Get transaction details
- `PATCH /madarsa/accounting/records/{recordId}` - Update transaction
- `DELETE /madarsa/accounting/records/{recordId}` - Delete transaction

#### **Library Module**
- `GET /madarsa/library` - List books
- `POST /madarsa/library/records` - Add book
- `GET /madarsa/library/records/{recordId}` - Get book details
- `PATCH /madarsa/library/records/{recordId}` - Update book
- `DELETE /madarsa/library/records/{recordId}` - Delete book

#### **Kitchen Module**
- `GET /madarsa/kitchen` - View inventory
- `POST /madarsa/kitchen/records` - Add inventory item
- `GET /madarsa/kitchen/records/{recordId}` - Get item details
- `PATCH /madarsa/kitchen/records/{recordId}` - Update item
- `DELETE /madarsa/kitchen/records/{recordId}` - Delete item

#### **Hostel Module**
- `GET /madarsa/hostel` - View hostel rooms
- `POST /madarsa/hostel/records` - Create room record
- `GET /madarsa/hostel/records/{recordId}` - Get room details
- `PATCH /madarsa/hostel/records/{recordId}` - Update room
- `DELETE /madarsa/hostel/records/{recordId}` - Delete room

#### **Administration Module**
- `GET /madarsa/administration` - View admin settings
- `POST /madarsa/administration/records` - Create admin record
- `GET /madarsa/administration/records/{recordId}` - Get admin details
- `PATCH /madarsa/administration/records/{recordId}` - Update admin
- `DELETE /madarsa/administration/records/{recordId}` - Delete admin

---

## 📝 Example Usage

### Get All Students
```bash
curl -X GET http://localhost:4000/api/madarsa/students \
  -H "Authorization: Bearer {token}"
```

### Create New Student
```bash
curl -X POST http://localhost:4000/api/madarsa/students/records \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "STU-1003",
    "name": "Ali Ahmed",
    "className": "Hifz - B",
    "guardian": "Hassan Ahmed",
    "status": "active"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@markaz.local",
    "password": "Admin@123"
  }'
```

---

## 🔑 Roles & Test Credentials (ek hi login page, role ke hisaab se dashboard)

| Role | Email | Password | Kya khulta hai |
|---|---|---|---|
| Super Admin | `superadmin@markaz.local` | `SuperAdmin@123` | Sab kuch |
| Super Admin (env) | `admin@markaz.local` | `Admin@123` (`ADMIN_PASSWORD` in `backend/.env`) | Sab kuch |
| Students | `students@markaz.local` | `Students@123` | Students + Support |
| Academics | `academics@markaz.local` | `Academics@123` | Academics, Attendance + Support |
| Accounting | `accounts@markaz.local` | `Accounts@123` | Accounting + Support |
| Library | `library@markaz.local` | `Library@123` | Library + Support |
| Kitchen | `kitchen@markaz.local` | `Kitchen@123` | Kitchen + Support |
| Hostel | `hostel@markaz.local` | `Hostel@123` | Hostel + Support |

Naya role add karna ho to `backend/src/config/roles.js` me `ROLES` aur `DEMO_USERS` me entry add karein.
Kisi role ko dusre module ki API call karne par `403` milta hai.

---

## 📋 Notes
- All routes (except `/auth/login`) require authentication
- Include `Authorization: Bearer {token}` header in all authenticated requests
- Module names in URLs are: students, academics, attendance, accounting, library, kitchen, hostel, administration
- Record IDs vary by module (e.g., STU-xxxx for students, CRS-xxx for courses)
