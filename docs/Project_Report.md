# PROJECT REPORT

# Car Parking Management System

## Submitted By

**Prakash Marandi**

## Technology Stack

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JWT Authentication
* bcrypt.js
* Express Validator
* Jest
* Supertest
* Postman

---

# 1. Introduction

Parking management is a common challenge in residential complexes, shopping malls, offices, hospitals, and public facilities. Traditional parking systems often rely on manual tracking, which can lead to inefficiencies, inaccurate records, and poor space utilization.

The Car Parking Management System is a backend application designed to automate vehicle parking operations, parking slot management, vehicle tracking, fee calculation, and dashboard analytics.

The system provides secure authentication, role-based access control, parking management workflows, and comprehensive reporting capabilities.

---

# 2. Project Objectives

The primary objectives of the project are:

* Automate parking slot allocation.
* Manage vehicle registration.
* Track vehicle entry and exit.
* Calculate parking fees automatically.
* Provide dashboard statistics.
* Maintain parking history records.
* Implement secure authentication and authorization.
* Build a scalable backend architecture.
* Practice industry-standard backend development concepts.

---

# 3. Problem Statement

Manual parking management systems suffer from:

* Inefficient slot allocation
* Human errors in record keeping
* Lack of vehicle tracking
* Difficulty generating reports
* Poor revenue tracking
* Security concerns

The proposed system solves these issues through automated parking operations and centralized data management.

---

# 4. System Features

## Authentication Module

### Features

* User Registration
* User Login
* Password Hashing
* JWT Authentication
* Role-Based Authorization

### Roles

#### Admin

Can:

* Manage parking slots
* Manage vehicles
* View dashboard analytics
* Perform parking operations

#### Operator

Can:

* Manage vehicles
* Perform vehicle entry
* Perform vehicle exit
* View dashboard data

---

## Vehicle Management Module

### Features

* Create Vehicle
* Get All Vehicles
* Get Vehicle By ID
* Update Vehicle
* Delete Vehicle

### Vehicle Types

* Bike
* Car
* Truck

---

## Parking Slot Management Module

### Features

* Create Parking Slot
* Get All Slots
* Get Available Slots
* Update Slot
* Delete Slot

### Slot Status

* Available
* Occupied
* Reserved

---

## Parking Operations Module

### Vehicle Entry

When a vehicle enters:

* Vehicle is validated
* Available slot is located
* Parking record is created
* Slot status becomes occupied

### Vehicle Exit

When a vehicle exits:

* Active parking record is located
* Parking duration is calculated
* Fee is calculated
* Parking record is completed
* Slot becomes available

---

## Dashboard Module

### Statistics API

Provides:

* Total Vehicles
* Total Parking Slots
* Available Slots
* Occupied Slots

### Revenue API

Provides:

* Total Revenue Generated

### Active Vehicles API

Provides:

* Vehicles currently parked

### Parking History API

Provides:

* Complete parking history
* Vehicle details
* Parking slot details

---

# 5. System Architecture

```text
Client
   |
   |
Express Routes
   |
Controllers
   |
Services
   |
Models
   |
MySQL Database
```

### Layer Responsibilities

#### Routes

Handle API endpoints.

#### Controllers

Process requests and responses.

#### Services

Contain business logic.

#### Models

Represent database tables.

#### Database

Stores persistent application data.

---

# 6. Database Design

## Tables

### users

Stores application users.

| Field    | Type    |
| -------- | ------- |
| id       | Integer |
| name     | String  |
| email    | String  |
| password | String  |
| role     | Enum    |

---

### vehicles

Stores registered vehicles.

| Field         | Type    |
| ------------- | ------- |
| id            | Integer |
| vehicleNumber | String  |
| ownerName     | String  |
| vehicleType   | Enum    |

---

### parking_slots

Stores parking slot information.

| Field      | Type    |
| ---------- | ------- |
| id         | Integer |
| slotNumber | String  |
| slotType   | Enum    |
| status     | Enum    |

---

### parking_records

Stores parking transactions.

| Field     | Type     |
| --------- | -------- |
| id        | Integer  |
| vehicleId | Integer  |
| slotId    | Integer  |
| entryTime | DateTime |
| exitTime  | DateTime |
| fee       | Decimal  |
| status    | Enum     |

---

# 7. Entity Relationships

```text
Vehicle
   |
   | 1
   |
   | N
ParkingRecord
   |
   | N
   |
   | 1
ParkingSlot
```

### Associations

* Vehicle has many Parking Records.
* Parking Record belongs to Vehicle.
* Parking Slot has many Parking Records.
* Parking Record belongs to Parking Slot.

---

# 8. Parking Fee Calculation

Fee calculation is based on vehicle type.

| Vehicle Type | Fee Per Hour |
| ------------ | ------------ |
| Bike         | ₹10          |
| Car          | ₹20          |
| Truck        | ₹30          |

### Formula

```text
Fee = Hours × Vehicle Rate
```

### Example

```text
Vehicle Type = Car

Parking Duration = 3 Hours

Fee = 3 × 20

Fee = ₹60
```

---

# 9. Security Implementation

## Password Hashing

Implemented using:

```text
bcrypt.js
```

Benefits:

* Secure password storage
* Protection against password leaks

---

## JWT Authentication

Implemented using:

```text
jsonwebtoken
```

Benefits:

* Stateless authentication
* Secure API access

---

## Authorization

Implemented role-based access control.

Example:

```text
Admin Only

Create Slot
Update Slot
Delete Slot
```

---

## Request Validation

Implemented using:

```text
express-validator
```

Validation added for:

* User Registration
* Login
* Vehicle Operations
* Parking Slot Operations

---

# 10. Testing

## Unit Testing

Framework:

```text
Jest
```

### Unit Tests Created

* Fee Calculator Test
* Authentication Middleware Test
* Role Middleware Test

---

## Integration Testing

Frameworks:

```text
Jest
Supertest
```

### APIs Tested

#### Authentication

* Register User
* Login User

#### Vehicles

* Create Vehicle
* Get Vehicles
* Get Vehicle By ID
* Update Vehicle
* Delete Vehicle

#### Parking Operations

* Vehicle Entry
* Vehicle Exit

### Result

```text
All Tests Passed Successfully
```

---

# 11. API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

---

## Vehicles

```http
POST   /api/vehicles
GET    /api/vehicles
GET    /api/vehicles/:id
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id
```

---

## Parking Slots

```http
POST   /api/slots
GET    /api/slots
GET    /api/slots/available
GET    /api/slots/:id
PUT    /api/slots/:id
DELETE /api/slots/:id
```

---

## Parking Records

```http
POST /api/parking/entry
POST /api/parking/exit
```

---

## Dashboard

```http
GET /api/dashboard/stats
GET /api/dashboard/revenue
GET /api/dashboard/active-vehicles
GET /api/dashboard/history
```

---

# 12. Challenges Faced

## Authentication Testing Issues

Problem:

* Duplicate email registrations during testing.

Solution:

* Generated unique emails dynamically.

---

## JWT Authorization Issues

Problem:

* Protected routes returning 401 errors.

Solution:

* Implemented login before tests and stored JWT token.

---

## Validation Failures

Problem:

* Update operations failed due to required validations.

Solution:

* Sent complete payload during updates.

---

## Route Handling Issues

Problem:

* Incorrect 404 middleware configuration.

Solution:

* Updated route handler implementation.

---

# 13. Key Learnings

Throughout the project, the following concepts were learned and applied:

### Backend Development

* Express.js
* Middleware Architecture
* REST API Design
* Error Handling

### Database

* MySQL
* Sequelize ORM
* Associations
* Database Normalization

### Security

* JWT Authentication
* Password Hashing
* Role-Based Authorization

### Testing

* Unit Testing
* Integration Testing
* API Testing

### Software Engineering

* Layered Architecture
* Clean Code Principles
* Separation of Concerns
* Documentation Practices

---

# 14. Future Enhancements

The following enhancements can be added in future versions:

### Reservation Management

Allow users to reserve parking slots.

### Payment Transactions

Track payments and transaction history.

### Audit Logs

Record all user actions.

### Parking Zones

Support zone-based parking management.

### Multi-Floor Parking

Manage parking across multiple floors.

### Vehicle Entry Images

Store images captured during vehicle entry.

### RFID Integration

Automate vehicle identification.

### QR Code Based Parking

Enable QR-based entry and exit operations.

---

# 15. Conclusion

The Car Parking Management System successfully automates parking operations, vehicle tracking, slot management, fee calculation, and reporting. The project demonstrates practical implementation of modern backend development concepts including authentication, authorization, database relationships, validation, testing, and API design.

The system follows a layered architecture and can be extended with additional enterprise-level features such as payment processing, reservations, RFID integration, and multi-floor parking support.

This project provided valuable hands-on experience in building scalable and maintainable backend systems using Node.js, Express.js, MySQL, and Sequelize ORM.
