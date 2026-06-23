# Car Parking Management System Backend

## Overview

A RESTful backend API for managing a car parking system.

The application supports:

* User Authentication
* Role-Based Access Control
* Vehicle Management
* Parking Slot Management
* Vehicle Entry
* Vehicle Exit
* Fee Calculation
* Dashboard Statistics
* Validation
* Automated Testing

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication

### Authorization

* Admin Role
* Operator Role

### Vehicle Management

* Create Vehicle
* Get Vehicle
* Update Vehicle
* Delete Vehicle

### Parking Slot Management

* Create Slot
* View Slots
* Update Slot
* Delete Slot

### Parking Operations

* Vehicle Entry
* Vehicle Exit
* Automatic Slot Assignment
* Automatic Fee Calculation

### Dashboard

* Total Vehicles
* Total Slots
* Occupied Slots
* Available Slots
* Parking History

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JWT
* bcryptjs
* express-validator
* Jest
* Supertest

---

## Project Structure

src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── tests/
│ ├── unit/
│ └── integration/
├── app.js
└── server.js

---

## Installation

Clone the repository

git clone <repository-url>

Install dependencies

npm install

Create .env file

npm run dev

---

## Running Tests

npm test

---

## API Base URL

http://localhost:5000/api

---

## Author

Prakash Marandi
