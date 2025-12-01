# AI Irrigation Optimization App

This is a Django REST API project for tracking **farm yields, watering, and fertilizing logs**, with planned AI-driven irrigation recommendations. It is designed for farmers and agricultural teams to **organize daily farm operations** and later integrate AI predictions.

---

## **Features**
- User registration & JWT-based authentication
- CRUD for **Yields (farm fields)**
- CRUD for **Watering Logs**
- CRUD for **Fertilizer Logs**
- Access control: Users can only access their own data
- Superuser can manage all data via Django admin
- Future-ready for AI recommendations and weather integration

---

## **Tech Stack**
- Python 3.11+
- Django 4+
- Django REST Framework
- PostgreSQL (recommended)
- JWT Authentication (`djangorestframework-simplejwt`)

---

## **Installation**

1. **Clone the repository**
```bash
git clone <repo_url>
cd irrigation_ai
python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Authentication
Register

Endpoint: POST `/api/auth/register/`

Request Body:
```json
{
  "username": "islom",
  "email": "test@example.com",
  "password": "123456"
}
```
Login

Endpoint: POST `/api/auth/login/`

Request Body:
```json
{
  "username": "islom",
  "password": "123456"
}
```

Response:
```json
{
  "access": "<JWT_ACCESS_TOKEN>",
  "refresh": "<JWT_REFRESH_TOKEN>"
}
```

Use the access token in the `Authorization` header for all other requests:
`Authorization: Bearer <ACCESS_TOKEN>`

APIs
1. Yields (Farm Fields)
---
- GET `/api/yields/` List all yields for authenticated user
- POST `/api/yields/` Create a new yield
- GET `/api/yields/<id>/` Retrieve one yield
- PATCH `/api/yields/<id>/` Update yield
- DELETE `/api/yields/<id>/` Delete yield

POST Body Example:
```json
{
  "name": "Chortoq Cotton Field",
  "location_lat": 41.032,
  "location_lng": 71.355,
  "size_ha": 5.4,
  "crop_type": "Cotton",
  "soil_type": "Clay"
}
```
2. Watering Logs
---
- GET	`/api/watering/`	List watering logs for user's yields
- POST	`/api/watering/`	Create a watering log
- GET	`/api/watering/<id>/`	Retrieve one log
- PATCH	`/api/watering/<id>/`	Update a log
- DELETE	`/api/watering/<id>/`	Delete a log

POST Body Example:
```json
{
  "yield_field": 3,
  "date": "2025-01-25",
  "water_amount_liters": 350,
  "method": "drip",
  "notes": "Morning irrigation"
}
```
3. Fertilizer Logs
---
- GET	`/api/fertilizer/`	List fertilizer logs for user's yields
- POST	`/api/fertilizer/`	Create a fertilizer log
- GET	`/api/fertilizer/<id>/`	Retrieve one log
- PATCH	`/api/fertilizer/<id>/`	Update a log
- DELETE	`/api/fertilizer/<id>/`	Delete a log

POST Body Example:
```json
{
  "yield_field": 3,
  "date": "2025-01-25",
  "fertilizer_type": "Urea",
  "amount_kg": 25,
  "notes": "Applied in morning"
}
```
