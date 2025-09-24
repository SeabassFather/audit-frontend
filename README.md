# AuditDNA Frontend

This is the frontend for the AuditDNA platform.

## Project Structure

- **Frontend Repo:** [audit-frontend](https://github.com/SeabassFather/audit-frontend)
- **Backend Repo:** [auditdna-backend-1](https://github.com/SeabassFather/auditdna-backend-1)

## Local Development Setup

### 1. Clone Both Repositories

```bash
git clone https://github.com/SeabassFather/audit-frontend.git
git clone https://github.com/SeabassFather/auditdna-backend-1.git
```

### 2. Install Dependencies

```bash
# Frontend
cd audit-frontend
npm install

# Backend
cd ../auditdna-backend-1
npm install
```

### 3. Configure Environment Variables

#### Frontend (.env)

Create a `.env` file in `audit-frontend`:

```
REACT_APP_API_URL=http://localhost:5000
```

Replace the URL with your backend's local address if different.

#### Backend (.env)

Refer to the backend repo for its required environment variables.

### 4. Start Both Projects

```bash
# Backend
cd auditdna-backend-1
npm start

# Frontend (in a separate terminal)
cd audit-frontend
npm start
```

### 5. Integration

- The frontend will communicate with the backend API at the address specified in `REACT_APP_API_URL`.
- For production, update the API URL accordingly.

## Backend Repository

See [auditdna-backend-1](https://github.com/SeabassFather/auditdna-backend-1) for backend setup and API documentation.

---

## Contribution Guide

1. For UI and client-side changes, use this repo.
2. For API or server-side logic, use the backend repo.
3. When making breaking changes to API, update the frontend integration and note changes in both repos.

---

## Troubleshooting

- If you get CORS errors, ensure the backend allows requests from your frontend origin.
- Double-check environment variables.
- Consult backend repo for API routes and docs.

---

## Need Help?

- Issues and questions welcome via [GitHub Issues](https://github.com/SeabassFather/audit-frontend/issues).