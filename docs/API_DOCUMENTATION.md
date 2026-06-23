# Car Parking Management System API Documentation

## Base URL

http://localhost:5000/api

---

# Authentication APIs

## Register Admin

POST /auth/register

Request

{
"name": "Admin User",
"email": "[admin2026@example.com](mailto:admin2026@example.com)",
"password": "password123",
"role": "admin"
}

Response

Status: 201

{
"success": true,
"user": {
"id": 1,
"name": "Admin User",
"email": "[admin2026@example.com](mailto:admin2026@example.com)",
"role": "admin"
}
}

---

## Register Operator

POST /auth/register

Request

{
"name": "Operator User",
"email": "[operator2026@example.com](mailto:operator2026@example.com)",
"password": "password123",
"role": "operator"
}

Response

Status: 201

{
"success": true,
"user": {
"id": 2,
"name": "Operator User",
"email": "[operator2026@example.com](mailto:operator2026@example.com)",
"role": "operator"
}
}

---

## Login

POST /auth/login

Request

{
"email": "[admin2026@example.com](mailto:admin2026@example.com)",
"password": "password123"
}

Response

Status: 200

{
"success": true,
"token": "jwt_token_here"
}

Save this token and use it in all protected routes.

Authorization Header

Bearer <jwt_token_here>

---

# Vehicle APIs

## Create Vehicle

POST /vehicles

Headers

Authorization: Bearer <token>

Request

{
"vehicleNumber": "JH01AB2026",
"ownerName": "Prakash Marandi",
"vehicleType": "car"
}

Response

Status: 201

{
"status": true,
"data": {
"id": 1,
"vehicleNumber": "JH01AB2026",
"ownerName": "Prakash Marandi",
"vehicleType": "car"
}
}

---

## Create Bike

POST /vehicles

Request

{
"vehicleNumber": "JH01BK2026",
"ownerName": "Aakash Deep",
"vehicleType": "bike"
}

---

## Get All Vehicles

GET /vehicles

Headers

Authorization: Bearer <token>

Response

Status: 200

[
{
"id": 1,
"vehicleNumber": "JH01AB2026",
"ownerName": "Prakash Marandi",
"vehicleType": "car"
}
]

---

## Get Vehicle By ID

GET /vehicles/1

Headers

Authorization: Bearer <token>

---

## Update Vehicle

PUT /vehicles/1

Headers

Authorization: Bearer <token>

Request

{
"vehicleNumber": "JH01AB2027",
"ownerName": "Prakash Kumar",
"vehicleType": "car"
}

Response

Status: 200

{
"status": true
}

---

## Delete Vehicle

DELETE /vehicles/1

Headers

Authorization: Bearer <token>

Response

Status: 200

{
"status": true,
"message": "Vehicle deleted successfully"
}

---

# Parking Slot APIs

## Create Car Slot

POST /slots

Headers

Authorization: Bearer <admin_token>

Request

{
"slotNumber": "C101",
"slotType": "car",
"status": "available"
}

Response

Status: 201

{
"id": 1,
"slotNumber": "C101",
"slotType": "car",
"status": "available"
}

---

## Create Bike Slot

POST /slots

Request

{
"slotNumber": "B101",
"slotType": "bike",
"status": "available"
}

---

## Get All Slots

GET /slots

Headers

Authorization: Bearer <token>

---

## Get Available Slots

GET /slots/available

Headers

Authorization: Bearer <token>

---

## Get Slot By ID

GET /slots/1

Headers

Authorization: Bearer <token>

---

## Update Slot

PUT /slots/1

Headers

Authorization: Bearer <admin_token>

Request

{
"slotNumber": "C102",
"slotType": "car",
"status": "available"
}

---

## Delete Slot

DELETE /slots/1

Headers

Authorization: Bearer <admin_token>

Response

Status: 204

No Content

---

# Parking Entry API

## Vehicle Entry

POST /parking/entry

Headers

Authorization: Bearer <token>

Request

{
"vehicleId": 1
}

Response

Status: 201

{
"success": true,
"message": "Vehicle parked successfully",
"data": {
"id": 1,
"vehicleId": 1,
"slotId": 1,
"status": "active"
}
}

---

# Parking Exit API

## Vehicle Exit

POST /parking/exit

Headers

Authorization: Bearer <token>

Request

{
"vehicleId": 1
}

Response

Status: 200

{
"success": true,
"message": "Vehicle exited successfully",
"data": {
"id": 1,
"vehicleId": 1,
"slotId": 1,
"fee": 20,
"status": "completed"
}
}

---

# Dashboard APIs

## Dashboard Statistics

GET /dashboard/stats

Headers

Authorization: Bearer <token>

Response

Status: 200

{
"totalVehicles": 2,
"totalSlots": 5,
"occupiedSlots": 1,
"availableSlots": 4
}

---

## Parking History

GET /dashboard/history

Headers

Authorization: Bearer <token>

Response

Status: 200

[
{
"id": 1,
"vehicleId": 1,
"slotId": 1,
"entryTime": "2026-06-23T08:00:00.000Z",
"exitTime": "2026-06-23T09:00:00.000Z",
"fee": 20,
"status": "completed"
}
]

---

# Common Error Responses

## Unauthorized

Status: 401

{
"success": false,
"message": "Invalid or missing token"
}

---

## Validation Error

Status: 400

{
"errors": [
{
"msg": "Vehicle number is required"
}
]
}

---

## Not Found

Status: 404

{
"message": "Resource not found"
}
