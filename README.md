# Family Folio

## Overview
A web application for personal finance that would track investments, expenses, monthly inflow and outflow. Provide insightful views on the porfolio/expenses, identify areas to optimize, send weekly reports etc.

## Features
- Portfolio Tracking
- Goal vs Investments
- Expense Categorization

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- Redux Toolkit (for state management)
- React Router (for navigation)
- Chart.js/Recharts (for financial visualizations)
- Axios (for API requests)

### Backend
- FastAPI (Python)
- PostgreSQL (database)
- JWT-based authentication
- SQLAlchemy (ORM)
- Pydantic (data validation)
- Alembic (database migrations)

### Prerequisites
- Docker and Docker Compose
- Node.js (v16+) and npm (for frontend development)
- Python 3.9+ (for backend development)
- Git (for version control)
- Gmail API credentials (for email parsing)
- macOS (since you mentioned using a Mac)
- VSCode or PyCharm (recommended IDEs)
- At least 8GB RAM for comfortable development

## Installation & Setup

### Install Docker & Github Desktop for mac

### Create main folders
```bash
mkdir -p frontend backend/app
```

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```env
# Frontend environment variables
FRONTEND_VAR_1=
FRONTEND_VAR_2=

# Backend environment variables
BACKEND_VAR_1=
BACKEND_VAR_2=
```

## Project Structure
```
family-folio/
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
├── backend/
│   ├── src/
│   ├── config/
│   └── ...
└── ...
```

## Docker Configuration

### Frontend Dockerfile
Create a `Dockerfile` in the frontend directory:
```dockerfile
FROM node:16

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE <port-no>

CMD ["npm", "start"]
```

### Backend Dockerfile
Create a `Dockerfile` in the backend directory:
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE <port-no>

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "<port-no>", "--reload"]
```

### Docker Compose
Create a `docker-compose.yml` in the root directory:
```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - <port-no>
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - REACT_APP_API_URL=
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - <port-no>
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=
      - SECRET_KEY=
      - ALGORITHM=
      - ACCESS_TOKEN_EXPIRE_MINUTES=
    depends_on:
      - db

  db:
    image: postgres:15
    ports:
      - <port-no>
    environment:
      - POSTGRES_USER=
      - POSTGRES_PASSWORD=
      - POSTGRES_DB=
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Start Application
```bash
# Start the application
docker-compose up --build

# To run in the background
docker-compose up --build -d
```

### Access the application
- Frontend: http://localhost:<port-no>
- Backend API: http://localhost:<port-no>
- API Documentation: http://localhost:<port-no>/docs

### Stopping Application
- If running in foreground, press Ctrl+C
- If running in background:
```bash
docker-compose down
```