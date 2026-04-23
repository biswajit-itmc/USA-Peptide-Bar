# Quick Start Guide - Testing the Auth System

## Prerequisites
- PostgreSQL running and configured
- Node.js 18+ installed
- API running with `npm run dev`

## 1. Setup Environment

Update your `.env` file:
```env
PORT=4000
NODE_ENV=development

DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=usa_peptide_bar

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_minimum_32_chars
JWT_EXPIRATION=24h
BCRYPT_ROUNDS=10
```

## 2. Run Migrations

```bash
npm run migrate:latest
```

## 3. (Optional) Seed Demo Data

```bash
npm run seed:run
```

This creates:
- **Retail user**: `retail@example.com` / `RetailPass123!`
- **Wholesale user**: `wholesale@example.com` / `WholesalePass123!`
- **Admin user**: `admin@example.com` / `AdminPass123!`
- **Sample applications** with pending status

## 4. Start the Server

```bash
npm run dev
```

Server runs on `http://localhost:4000`

---

## Testing Workflows

### Scenario 1: Retail User Registration

**Step 1:** Sign up as retail user
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@retail.com",
    "phone": "555-1234",
    "company": "My Store",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@retail.com",
      "role": "retail",
      "is_approved": true
    }
  },
  "statusCode": 201
}
```

**Step 2:** Login as retail user
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@retail.com",
    "password": "SecurePass123!",
    "role": "retail"
  }'
```

**Step 3:** Access protected endpoint with token
```bash
TOKEN="<paste_token_here>"

curl -X GET http://localhost:4000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

---

### Scenario 2: Wholesale Application & Approval

**Step 1:** Submit wholesale application
```bash
curl -X POST http://localhost:4000/api/auth/wholesale/apply \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "ABC Wholesale Corp",
    "contactName": "Jane Smith",
    "email": "jane.smith@abcwholesale.com",
    "phone": "555-9876",
    "businessType": "Distributor",
    "monthlyVolume": 5000,
    "source": "Google Search"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Wholesale application submitted successfully",
  "data": {
    "id": 1,
    "business_name": "ABC Wholesale Corp",
    "status": "pending",
    ...
  },
  "statusCode": 201
}
```

**Step 2:** Admin login
```bash
curl -X POST http://localhost:4000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "AdminPass123!"
  }'
```

**Step 3:** Admin retrieves all pending applications
```bash
TOKEN="<admin_token>"

curl -X GET "http://localhost:4000/api/auth/admin/applications?status=pending" \
  -H "Authorization: Bearer $TOKEN"
```

**Step 4:** Admin approves application
```bash
curl -X POST http://localhost:4000/api/auth/admin/applications/1/approve \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "password": "InitialPassword123!"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Wholesale application approved and user account created",
  "data": {
    "user": {
      "id": 2,
      "first_name": "Jane",
      "email": "jane.smith@abcwholesale.com",
      "role": "wholesale",
      "is_approved": true
    },
    "message": "User can now log in with their email"
  },
  "statusCode": 200
}
```

**Step 5:** Wholesale user logs in
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@abcwholesale.com",
    "password": "InitialPassword123!",
    "role": "wholesale"
  }'
```

**Step 6:** Wholesale user accesses wholesale endpoint
```bash
TOKEN="<wholesale_token>"

curl -X GET http://localhost:4000/api/auth/wholesale/verify \
  -H "Authorization: Bearer $TOKEN"
```

---

### Scenario 3: Reject Application

```bash
TOKEN="<admin_token>"

curl -X POST http://localhost:4000/api/auth/admin/applications/2/reject \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rejectionReason": "Insufficient business verification"
  }'
```

---

## Testing Tools

### Using Postman
1. Create a new collection
2. Import the endpoints from AUTH_SYSTEM_README.md
3. Set environment variables for tokens
4. Test each workflow

### Using VS Code REST Client Extension
Create `test.http` file:
```http
@baseUrl = http://localhost:4000

### Signup
POST {{baseUrl}}/api/auth/signup
Content-Type: application/json

{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "password": "TestPass123!",
  "confirmPassword": "TestPass123!"
}

### Login
POST {{baseUrl}}/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "TestPass123!",
  "role": "retail"
}
```

---

## Validation Testing

### Test Invalid Email
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "invalid-email",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }'
```

**Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "{\"email\":\"Invalid email format\"}",
  "statusCode": 400
}
```

### Test Weak Password
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "weak",
    "confirmPassword": "weak"
  }'
```

**Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "error": "{\"password\":\"Password must be at least 8 characters long\"}",
  "statusCode": 400
}
```

### Test Duplicate Email
```bash
# Try registering with same email twice
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }'
```

**Response (409):**
```json
{
  "success": false,
  "message": "Email already registered",
  "error": null,
  "statusCode": 409
}
```

---

## Common Issues & Solutions

### ✗ "Cannot find module 'bcryptjs'"
**Solution:** Run `npm install bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken`

### ✗ "Database connection failed"
**Solution:** 
- Ensure PostgreSQL is running
- Check DB credentials in .env
- Create database: `createdb usa_peptide_bar`

### ✗ "Migrations failed"
**Solution:** Run `npm run migrate:latest` after creating database

### ✗ "Port 4000 already in use"
**Solution:** Change PORT in .env or kill process: `lsof -ti:4000 | xargs kill -9`

### ✗ "Invalid or expired token"
**Solution:** Log in again to get a fresh token

---

## Database Inspection

### View Users
```sql
SELECT id, email, role, is_approved, created_at FROM users;
```

### View Wholesale Applications
```sql
SELECT id, business_name, status, created_at FROM wholesale_applications;
```

### Reset Database (Development Only)
```bash
npm run migrate:rollback
npm run migrate:latest
npm run seed:run
```

---

## Next: Customization

After the basic system is working, you can:

1. **Add Admin Permissions**: Extend the separate admins table with finer-grained permissions
2. **Email Notifications**: Send confirmation/approval emails
3. **Password Reset**: Implement forgot password flow
4. **Rate Limiting**: Prevent brute force attacks
5. **Audit Logging**: Track all authentication events
6. **API Documentation**: Generate Swagger/OpenAPI docs

---

## Support

For issues or questions:
1. Check error messages in console
2. Review AUTH_SYSTEM_README.md for API documentation
3. Check database logs for connection issues
4. Verify .env configuration
