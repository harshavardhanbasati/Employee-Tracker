# Employee Task Tracker

Full-stack employee and task management application.

## Stack
- React + Vite + Tailwind CSS
- FastAPI + SQLAlchemy
- PostgreSQL

## Run Backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment, then:

```bash
pip install -r requirements.txt
```

Create a PostgreSQL database named `employee_tracker` and set `DATABASE_URL` in
`backend/.env` (see `backend/.env.example`). Configure allowed frontend origins
with `CORS_ORIGINS` in the same file. Then:

```bash
uvicorn main:app --reload
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Set the backend URL with `VITE_API_URL` in `frontend/.env` (see
`frontend/.env.example`). For local development, use
`http://127.0.0.1:8000`.

The frontend and backend use separate `.env` files because they run as separate
applications: `frontend/.env` configures the API address, while `backend/.env`
configures the database connection and CORS. Values prefixed with `VITE_` are
included in the browser bundle, so use them only for public settings such as the
API address; never put passwords or other secrets in `frontend/.env`.
