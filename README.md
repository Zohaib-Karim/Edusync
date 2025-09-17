# Edusync

A web-based timetable & academic scheduling system. It helps institutions generate, manage, and optimize schedules with minimal conflict and maximal resource utilization.

---

## 🚀 Features

- Automatic timetable generation with constraint solving  
- Role-based user management (Admin, Faculty, Student)  
- Multiple timetable scenarios (draft & live)  
- Faculty leave / substitute management  
- Resource booking (classrooms, labs, etc.)  
- Real-time notifications and updates  
- Analytics dashboards for utilization, workload, conflicts, etc.

---

## 🏗️ Architecture / Stack

| Layer | Technology |
|-------|------------|
| Backend | Django + Django REST Framework |
| Database | MongoDB (via Djongo or MongoEngine) |
| Scheduler / Optimizer | Google OR-Tools CP-SAT |
| Task Queue / Background Jobs | Celery + Redis |
| Frontend | React, Tailwind CSS (or similar JS framework) |
| Notifications & Email | (e.g., SMTP / API-based) |

---

## 📂 Directory Structure

```text
schedulr-aura/
├── backend/
│   ├── manage.py
│   ├── scheduler/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── services/
│   │   ├── tasks.py
│   └── config/
│       ├── settings.py
│       ├── urls.py
│       └── …
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
├── docker-compose.yml
├── README.md
└── requirements.txt
