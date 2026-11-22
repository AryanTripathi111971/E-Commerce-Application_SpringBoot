# E-Commerce Application — Spring Boot

A full-stack e-commerce application with a **Spring Boot REST API**, **MySQL** persistence, and a separate **HTML, CSS, and JavaScript** storefront.

## Tech Stack
- Backend: Java 21, Spring Boot 3.4.3, Spring Web, Spring Data JPA
- Database: MySQL
- Frontend: HTML5, CSS3, JavaScript
- Build tool: Maven

## Project Structure
```text
.
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/genie/Ecomm/
│       │   ├── controller/  # Product, user, and order REST controllers
│       │   ├── dto/         # Order response DTOs
│       │   ├── model/       # JPA entities and request models
│       │   ├── repo/        # Spring Data repositories
│       │   ├── service/     # Business logic
│       │   └── EcommApplication.java
│       └── resources/application.properties
└── frontend/
    ├── index.html
    ├── cart.html
    ├── css/styles.css
    └── js/{api.js,cart.js}
```

## Features
- List products, get a product by ID, add products, and delete products
- User registration and login endpoints
- Place orders for a user
- Retrieve all orders or orders belonging to a user
- Persist users, products, orders, and order items with Spring Data JPA
- Browser storefront and cart interface that calls the backend API

## Prerequisites
- JDK 21
- Maven 3.9+
- MySQL 8+
- A browser

## Run locally

### 1. Create the database
```sql
CREATE DATABASE ecommerce;
```

### 2. Configure database credentials
The backend reads `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD` from environment variables. See `backend/.env.example` for the expected values. Spring Boot does not automatically load a `.env` file; set the variables in your terminal or IDE run configuration.

Windows PowerShell:
```powershell
$env:DB_URL="jdbc:mysql://localhost:3306/ecommerce"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
```

### 3. Start the API
```bash
cd backend
mvn spring-boot:run
```
The API runs at `http://localhost:8080`.

### 4. Open the frontend
Open `frontend/index.html` in a browser, or serve the `frontend` directory with a local static file server. The frontend currently calls `http://localhost:8080` from `frontend/js/api.js`.

## REST API

Base URL: `http://localhost:8080`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/products` | Get all products |
| GET | `/products/{id}` | Get a product by ID |
| POST | `/products` | Add a product |
| DELETE | `/products/{id}` | Delete a product |
| POST | `/users/register` | Register a user |
| POST | `/users/login` | Log in a user |
| GET | `/users` | Get all users |
| POST | `/orders/place/{userId}` | Place an order |
| GET | `/orders/all-orders` | Get all orders |
| GET | `/orders/user/{userId}` | Get orders for one user |

### Add-product request example
```json
{
  "name": "Wireless Headphones",
  "description": "Bluetooth over-ear headphones",
  "price": 2499,
  "imageUrl": "https://example.com/headphones.jpg",
  "category": "Electronics"
}
```

### Place-order request example
```json
{
  "productQuantities": { "1": 2, "2": 1 },
  "totalAmount": 4998
}
```

## Security note
This is an educational/demo project. The current user service compares passwords directly, and the API exposes broad user/order operations. Do **not** deploy it publicly or use real customer data without adding password hashing, authentication/authorization, input validation, safer error handling, and appropriate access controls. Never commit real database credentials.

## Limitations
- No automated tests were included in the supplied project.
- The frontend API base URL is hard-coded to `http://localhost:8080`.
- The original banner/product image files were not included. The uploaded storefront uses a lightweight text-and-CSS layout and does not depend on those image files.

## License
No license file was included in the supplied project. Add an appropriate license only if you own the code or have permission to license it.
