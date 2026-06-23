# Database Design Documentation

# Car Parking Management System

## Overview

The Car Parking Management System uses a relational database designed to manage:

* Users
* Vehicles
* Parking Slots
* Parking Records
* Parking Operations
* Dashboard Analytics

The system is implemented using:

* MySQL
* Sequelize ORM
* Node.js
* Express.js

---

# Database Schema

The database consists of four primary tables:

1. users
2. vehicles
3. parking_slots
4. parking_records

---

# Entity Relationship Diagram (ERD)

```text
User
 |
 |
(No Direct Relationship)
 |
 |

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

A vehicle can have multiple parking records.

A parking slot can have multiple parking records.

Each parking record belongs to exactly one vehicle and one parking slot.

---

# Table: users

Stores system users such as administrators and operators.

## Model

```javascript
User
```

## Table Name

```sql
users
```

## Columns

| Column    | Type                  | Constraints                 |
| --------- | --------------------- | --------------------------- |
| id        | INTEGER               | Primary Key, Auto Increment |
| name      | STRING                | Not Null                    |
| email     | STRING                | Unique, Not Null            |
| password  | STRING                | Not Null                    |
| role      | ENUM(admin, operator) | Default: operator           |
| createdAt | DATETIME              | Auto Generated              |
| updatedAt | DATETIME              | Auto Generated              |

## Purpose

* Authentication
* Authorization
* Role Management

## Example Record

```json
{
  "id": 1,
  "name": "Prakash Marandi",
  "email": "prakash@example.com",
  "role": "admin"
}
```

---

# Table: vehicles

Stores registered vehicles.

## Model

```javascript
Vehicle
```

## Table Name

```sql
vehicles
```

## Columns

| Column        | Type                   | Constraints                 |
| ------------- | ---------------------- | --------------------------- |
| id            | INTEGER                | Primary Key, Auto Increment |
| vehicleNumber | STRING                 | Unique, Not Null            |
| ownerName     | STRING                 | Not Null                    |
| vehicleType   | ENUM(bike, car, truck) | Not Null                    |
| createdAt     | DATETIME               | Auto Generated              |
| updatedAt     | DATETIME               | Auto Generated              |

## Purpose

* Vehicle Registration
* Vehicle Lookup
* Parking Assignment

## Example Record

```json
{
  "id": 1,
  "vehicleNumber": "JH01AB2026",
  "ownerName": "Prakash Marandi",
  "vehicleType": "car"
}
```

---

# Table: parking_slots

Stores all parking slots available in the parking facility.

## Model

```javascript
ParkingSlot
```

## Table Name

```sql
parking_slots
```

## Columns

| Column     | Type                                | Constraints                 |
| ---------- | ----------------------------------- | --------------------------- |
| id         | INTEGER                             | Primary Key, Auto Increment |
| slotNumber | STRING                              | Unique, Not Null            |
| slotType   | ENUM(bike, car, truck)              | Not Null                    |
| status     | ENUM(available, occupied, reserved) | Default: available          |
| createdAt  | DATETIME                            | Auto Generated              |
| updatedAt  | DATETIME                            | Auto Generated              |

## Purpose

* Slot Management
* Availability Tracking
* Occupancy Monitoring

## Example Record

```json
{
  "id": 1,
  "slotNumber": "C101",
  "slotType": "car",
  "status": "available"
}
```

---

# Table: parking_records

Stores complete parking transactions.

## Model

```javascript
ParkingRecord
```

## Table Name

```sql
parking_records
```

## Columns

| Column    | Type                    | Constraints                 |
| --------- | ----------------------- | --------------------------- |
| id        | INTEGER                 | Primary Key, Auto Increment |
| vehicleId | INTEGER                 | Not Null                    |
| slotId    | INTEGER                 | Not Null                    |
| entryTime | DATETIME                | Default Current Time        |
| exitTime  | DATETIME                | Nullable                    |
| fee       | DECIMAL(10,2)           | Default 0                   |
| status    | ENUM(active, completed) | Default active              |
| createdAt | DATETIME                | Auto Generated              |
| updatedAt | DATETIME                | Auto Generated              |

## Purpose

* Vehicle Entry Tracking
* Vehicle Exit Tracking
* Fee Calculation
* Parking History

## Example Record

```json
{
  "id": 1,
  "vehicleId": 1,
  "slotId": 1,
  "entryTime": "2026-06-23 10:00:00",
  "exitTime": "2026-06-23 12:00:00",
  "fee": 40,
  "status": "completed"
}
```

---

# Relationships

## Vehicle → ParkingRecord

### Definition

```javascript
Vehicle.hasMany(ParkingRecord)
```

### Meaning

One vehicle can have many parking records.

Example:

```text
Vehicle
JH01AB2026

Parking Records
--------------
Record #1
Record #2
Record #3
```

---

## ParkingRecord → Vehicle

### Definition

```javascript
ParkingRecord.belongsTo(Vehicle)
```

### Meaning

Every parking record belongs to one vehicle.

---

## ParkingSlot → ParkingRecord

### Definition

```javascript
ParkingSlot.hasMany(ParkingRecord)
```

### Meaning

One parking slot can be used multiple times.

Example:

```text
Slot C101

Record #1
Record #2
Record #3
```

---

## ParkingRecord → ParkingSlot

### Definition

```javascript
ParkingRecord.belongsTo(ParkingSlot)
```

### Meaning

Every parking record is associated with exactly one parking slot.

---

# Sequelize Associations

```javascript
Vehicle.hasMany(ParkingRecord, {
  foreignKey: "vehicleId",
  as: "parkingRecords",
});

ParkingRecord.belongsTo(Vehicle, {
  foreignKey: "vehicleId",
  as: "vehicle",
});

ParkingSlot.hasMany(ParkingRecord, {
  foreignKey: "slotId",
  as: "parkingRecords",
});

ParkingRecord.belongsTo(ParkingSlot, {
  foreignKey: "slotId",
  as: "parkingSlot",
});
```

---

# Business Rules

## User Rules

* Email must be unique.
* Password is stored in hashed format.
* Roles:

  * admin
  * operator

---

## Vehicle Rules

* Vehicle number must be unique.
* Vehicle type must be:

  * bike
  * car
  * truck

---

## Parking Slot Rules

* Slot number must be unique.
* Slot status can be:

  * available
  * occupied
  * reserved

---

## Parking Record Rules

* A vehicle cannot have multiple active parking records.
* Exit operation changes:

  * status → completed
  * exitTime → current timestamp
  * fee → calculated amount
* Slot becomes available after vehicle exit.

---

# Dashboard Queries

The dashboard uses aggregated data from multiple tables.

## Total Vehicles

```sql
SELECT COUNT(*) FROM vehicles;
```

## Total Slots

```sql
SELECT COUNT(*) FROM parking_slots;
```

## Occupied Slots

```sql
SELECT COUNT(*)
FROM parking_slots
WHERE status = 'occupied';
```

## Available Slots

```sql
SELECT COUNT(*)
FROM parking_slots
WHERE status = 'available';
```

## Parking History

```sql
SELECT *
FROM parking_records;
```

## Revenue Generated

```sql
SELECT SUM(fee)
FROM parking_records
WHERE status = 'completed';
```

---

# Normalization

The database follows Third Normal Form (3NF).

## First Normal Form (1NF)

* No repeating groups.
* Atomic values only.

## Second Normal Form (2NF)

* All non-key attributes depend on the primary key.

## Third Normal Form (3NF)

* No transitive dependencies.
* Data redundancy minimized.

---

# Future Enhancements

Potential database improvements:

* Reservation Management Table
* Payment Transactions Table
* Audit Logs Table
* Parking Zones Table
* Multi-Floor Parking Support
* Vehicle Entry Images
* RFID Integration
* QR Code Based Parking

---

# Database Summary

| Table           | Purpose                          |
| --------------- | -------------------------------- |
| users           | Authentication and authorization |
| vehicles        | Vehicle registration             |
| parking_slots   | Slot management                  |
| parking_records | Parking transactions and history |

Total Tables: 4

Relationships: 4

Normalization Level: 3NF

Database Engine: MySQL

ORM: Sequelize
